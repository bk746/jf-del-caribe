/**
 * Extrait et optimise les visuels de la section Galerie.
 *
 * Usage : node scripts/prepare-gallery-assets.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "src/images";
const OUTPUT_DIR = "src/images/gallery";

const FRAME_EXTRACTS = [
  {
    source: "Frame 9.png",
    output: "grava-mixta-chantier.webp",
    crop: { left: 0, top: 473, width: 549, height: 253 },
    width: 1100,
  },
  {
    source: "Frame 10.png",
    output: "sable-fin-chantier.webp",
    crop: { left: 0, top: 496, width: 555, height: 230 },
    width: 1100,
  },
  {
    source: "Frame 12.png",
    output: "gravilla-chantier.webp",
    crop: { left: 0, top: 493, width: 549, height: 233 },
    width: 1100,
  },
  {
    source: "livraison-camion-source.png",
    output: "livraison-camion-chantier.webp",
    crop: null,
    width: 1400,
  },
  {
    source: "Frame 14.png",
    output: "pierres-chantier.webp",
    crop: { left: 0, top: 410, width: 560, height: 316 },
    width: 1120,
  },
  {
    source: "Frame 15.png",
    output: "terre-noire-chantier.webp",
    crop: { left: 0, top: 410, width: 560, height: 316 },
    width: 1120,
  },
];

async function extractFrames() {
  for (const { source, output, crop, width } of FRAME_EXTRACTS) {
    let pipeline = sharp(path.join(SOURCE_DIR, source)).flatten({
      background: "#ffffff",
    });
    if (crop) pipeline = pipeline.extract(crop);

    await pipeline
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(path.join(OUTPUT_DIR, output));

    console.log(`${output} ← ${source}`);
  }
}

async function buildHeroQuarry() {
  await sharp("public/video/hero-poster.jpg")
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(OUTPUT_DIR, "chantier-quarry.webp"));

  console.log("chantier-quarry.webp ← hero-poster.jpg");
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await extractFrames();
  await buildHeroQuarry();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
