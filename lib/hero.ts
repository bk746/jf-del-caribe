const LOGO_NATURAL_WIDTH = 1120;
const LOGO_NATURAL_HEIGHT = 912;

export type HeroMetrics = {
  radius: number;
  logoHeight: number;
  logoWidth: number;
  logoPaddingLeft: number;
  logoPaddingRight: number;
  notchWidth: number;
  notchHeight: number;
  compactNav: boolean;
};

export function getHeroMetrics(containerWidth: number): HeroMetrics {
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth < 1024;

  const radius = isMobile ? 18 : 25;
  const logoHeight = isMobile ? 68 : isTablet ? 86 : 100;
  const logoPaddingLeft = isMobile ? 14 : 24;
  const logoPaddingRight = isMobile ? 14 : 22;
  const logoWidth = Math.round(
    (logoHeight * LOGO_NATURAL_WIDTH) / LOGO_NATURAL_HEIGHT,
  );

  return {
    radius,
    logoHeight,
    logoWidth,
    logoPaddingLeft,
    logoPaddingRight,
    notchWidth: isMobile ? 0 : logoPaddingLeft + logoWidth + logoPaddingRight,
    notchHeight: isMobile ? 0 : isTablet ? 120 : 120,
    compactNav: isMobile,
  };
}

export function buildHeroPath(
  width: number,
  height: number,
  notchWidth: number,
  notchHeight: number,
  radius: number,
) {
  if (notchWidth <= radius || notchHeight <= radius) {
    return [
      `M ${radius} 0`,
      `H ${width - radius}`,
      `A ${radius} ${radius} 0 0 1 ${width} ${radius}`,
      `V ${height - radius}`,
      `A ${radius} ${radius} 0 0 1 ${width - radius} ${height}`,
      `H ${radius}`,
      `A ${radius} ${radius} 0 0 1 0 ${height - radius}`,
      `V ${radius}`,
      `A ${radius} ${radius} 0 0 1 ${radius} 0`,
      "Z",
    ].join(" ");
  }

  return [
    `M ${notchWidth + radius} 0`,
    `H ${width - radius}`,
    `A ${radius} ${radius} 0 0 1 ${width} ${radius}`,
    `V ${height - radius}`,
    `A ${radius} ${radius} 0 0 1 ${width - radius} ${height}`,
    `H ${radius}`,
    `A ${radius} ${radius} 0 0 1 0 ${height - radius}`,
    `V ${notchHeight + radius}`,
    `A ${radius} ${radius} 0 0 1 ${radius} ${notchHeight}`,
    `H ${notchWidth - radius}`,
    `A ${radius} ${radius} 0 0 0 ${notchWidth} ${notchHeight - radius}`,
    `V ${radius}`,
    `A ${radius} ${radius} 0 0 1 ${notchWidth + radius} 0`,
    "Z",
  ].join(" ");
}

export function getHeroLogoViewportTarget(
  frameRect: DOMRect,
  containerWidth: number,
) {
  const metrics = getHeroMetrics(containerWidth);

  return {
    centerX: frameRect.left + metrics.logoPaddingLeft + metrics.logoWidth / 2,
    centerY: frameRect.top + metrics.notchHeight / 2,
    width: metrics.logoWidth,
    height: metrics.logoHeight,
    metrics,
  };
}

export const HERO_TRUST = [
  "Presupuesto en 24 h",
  "Entrega",
  "Camiones de 3 a 14 m³",
];

export { LOGO_NATURAL_WIDTH, LOGO_NATURAL_HEIGHT };
