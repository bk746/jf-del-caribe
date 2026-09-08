/**
 * Prépare les visuels de la section Produits.
 *
 * Trois problèmes des sources justifient ce pipeline :
 *
 * 1. Les PNG détourés ont des cadrages hétérogènes (portrait 1107x1600 ou
 *    paysage 1600x1334) et le sujet n'occupe que 30 à 41 % de la hauteur. Placés
 *    tels quels en `object-contain`, les matériaux apparaissent à des tailles
 *    incohérentes d'une carte à l'autre.
 * 2. L'avant-bras, coupé par le photographe, « flotte » en plein cadre. On le
 *    fait donc déborder à ras du bord droit pour que la coupe soit lue comme
 *    intentionnelle, et on rogne l'excédent d'avant-bras.
 * 3. La texture de pierres haute résolution porte un watermark en bas à droite.
 *    Le camion HD est dans `livraison-camion-source.png` — on n’extrait plus
 *    la maquette pixelisée `Frame 13.png`.
 *
 * Usage : node scripts/prepare-material-assets.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "src/images";
const OUTPUT_DIR = "src/images/materials";

/** Canvas des détourés : même ratio que la tuile d'affichage (40/21). */
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 840;
/** Part de la hauteur du canvas occupée par le sujet (main + matière). */
const SUBJECT_HEIGHT_RATIO = 0.86;
/**
 * Ratio largeur/hauteur maximal du sujet. Au-delà, l'excédent d'avant-bras est
 * rogné à droite : cela n'entame jamais la matière, qui est à gauche.
 */
const MAX_SUBJECT_RATIO = 1.75;
/** Un pixel compte comme sujet au-dessus de ce seuil d'opacité. */
const ALPHA_THRESHOLD = 16;

const CUTOUTS = [
  { source: "98c94f3b-4c94-44e0-b161-7b3d5d8ee527.png", output: "grava-mixta.png" },
  { source: "dcde1b30-51ca-48e0-ba53-e3eb54b1c8e3.png", output: "gravilla.png" },
  { source: "137c2af0-5eb7-4f49-a17b-12ec277e4c33.png", output: "polvo.png" },
  { source: "7d5d3c3b-9d0b-44b4-8408-3a11b71372ec.png", output: "cemantante.png" },
];

/** Boîte englobante des pixels non transparents. */
async function findAlphaBounds(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * channels + 3] <= ALPHA_THRESHOLD) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) throw new Error(`Aucun pixel opaque dans ${file}`);

  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function buildCutouts() {
  for (const { source, output } of CUTOUTS) {
    const sourcePath = path.join(SOURCE_DIR, source);
    const bounds = await findAlphaBounds(sourcePath);

    // Rogne l'excédent d'avant-bras, à droite uniquement.
    const maxWidth = Math.round(bounds.height * MAX_SUBJECT_RATIO);
    const crop = { ...bounds, width: Math.min(bounds.width, maxWidth) };

    const subjectHeight = Math.round(CANVAS_HEIGHT * SUBJECT_HEIGHT_RATIO);
    const subjectWidth = Math.round(subjectHeight * (crop.width / crop.height));

    const subject = await sharp(sourcePath)
      .extract(crop)
      .resize(subjectWidth, subjectHeight, { fit: "fill" })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: subject,
          // Bord droit à ras : l'avant-bras sort du cadre au lieu d'y flotter.
          left: CANVAS_WIDTH - subjectWidth,
          top: Math.round((CANVAS_HEIGHT - subjectHeight) / 2),
        },
      ])
      .webp({ quality: 86, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, output.replace(/\.png$/, ".webp")));

    console.log(
      `${output.padEnd(20)} bbox ${bounds.width}x${bounds.height} → rogné ${crop.width}x${crop.height} → sujet ${subjectWidth}x${subjectHeight}`,
    );
  }
}

async function buildTextures() {
  // Le watermark « k. » occupe le coin inférieur droit : on garde le carré haut-gauche.
  const stone = path.join(
    SOURCE_DIR,
    "6a354a0c714db81fbf2fca6f_Design-sans-titre-_37_.webp",
  );
  const { width, height } = await sharp(stone).metadata();
  const keep = Math.round(Math.min(width, height) * 0.83);

  await sharp(stone)
    .extract({ left: 0, top: 0, width: keep, height: keep })
    .webp({ quality: 88 })
    .toFile(path.join(OUTPUT_DIR, "piedras-mamposteria.webp"));

  console.log(
    `piedras-mamposteria.webp source ${width}x${height} → ${keep}x${keep} (watermark rogné)`,
  );

  const truck = path.join(SOURCE_DIR, "livraison-camion-source.png");
  const truckMeta = await sharp(truck).metadata();
  await sharp(truck)
    .resize({ width: 1536, withoutEnlargement: true })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 88 })
    .toFile(path.join(OUTPUT_DIR, "livraison-camion.webp"));

  console.log(
    `livraison-camion.webp source ${truckMeta.width}x${truckMeta.height} → 1536 webp`,
  );
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await buildCutouts();
  await buildTextures();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
