import rgba from "color-rgba";
import flow from "lodash.flow";

export const COLOUR_TYPE = {
  GREY: "grey",
  ALPHA: "alpha",
  OPAQUE: "opaque"
};

// Convert an RGBA code to R, G, B and alpha hash
export const rgbAlpha = colour => {
  const [R, G, B, A] = rgba(colour);
  return {
    r: parseInt(R),
    g: parseInt(G),
    b: parseInt(B),
    alpha: parseFloat(A)
  };
};

// Calculates the hue value for a given colour
export const calcHue = colour => {
  const { primaryMax, _r, _g, _b, primaryDelta } = colour;
  if (primaryMax === _r) {
    return 60 * (((_g - _b) / primaryDelta) % 6);
  } else if (primaryMax === _g) {
    return 60 * ((_b - _r) / primaryDelta + 2);
  } else if (primaryMax === _b) {
    return 60 * ((_r - _g) / primaryDelta + 4);
  }
};

// Sort colour by hue with red hues sorted lowest
const sortByHue = (a, b) => a.hue - b.hue;

// Sort colour by alpha value with most transparent sorted lowest
const sortByAlpha = (a, b) => a.rgb.alpha - b.rgb.alpha;

// Sort colour by red value (for greyscale)
const sortByRed = (a, b) => a.rgb.r - b.rgb.r;

// Sort colour by hue and then opacity with red hues / most opaque colours sorted lowest
const sortAlpha = (a, b) =>
  sortByHue(a, b) ? sortByHue(a, b) : sortByAlpha(a, b);

// Dedupe palette input
export const dedupe = (palette = []) =>
  Array.isArray(palette)
    ? palette.filter((item, i) => palette.indexOf(item) === i)
    : [];

// Returns a new list of colour objects, augmenting each colour object with RGB values
export const setRgbPrimaryValues = palette =>
  palette.map(colour => ({
    colour,
    rgb: rgbAlpha(colour)
  }));

// Remove invalid colours
export const clean = palette =>
  palette.filter(({ rgb }) => !Object.values(rgb).includes(NaN));

// Returns a new list of colour objects, with each colour object augmented with normalised R, G and B values
export const setNormalisedRgbPrimaryValues = palette =>
  palette.map(colour => {
    const normalisePrimary = primary => Number((primary / 255).toFixed(9));
    const { rgb } = colour;
    return {
      ...colour,
      _r: normalisePrimary(rgb.r),
      _g: normalisePrimary(rgb.g),
      _b: normalisePrimary(rgb.b)
    };
  });

// Returns a new list of colour objects, augmenting each colour object with R, G and B range values
export const setRgbPrimaryRangeValues = palette =>
  palette.map(colour => {
    const { _r, _g, _b } = colour;
    const primaryMin = Math.min(_r, _g, _b);
    const primaryMax = Math.max(_r, _g, _b);
    const primaryDelta = primaryMax - primaryMin;
    return {
      ...colour,
      primaryMin,
      primaryMax,
      primaryDelta
    };
  });

// Returns a new list of colour objects, augmenting each colour object with a colour type (grey, alpha, opaque)
export const setColourType = palette =>
  palette.map(colour => ({
    ...colour,
    colourType:
      colour.primaryDelta === 0 /* greyscale */
        ? COLOUR_TYPE.GREY
        : colour.rgb.alpha === 1 /* opaque */
          ? COLOUR_TYPE.OPAQUE
          : COLOUR_TYPE.ALPHA
  }));

// Returns a new list of colour objects, augmenting each colour object with a hue property
export const setHue = palette =>
  palette.map(colour => ({
    ...colour,
    hue: colour.colourType === COLOUR_TYPE.GREY ? null : calcHue(colour)
  }));

// Returns an object containing alpha, opaque and grey lists which each colour list sorted by spectrum
export const sortColorsByGroup = palette => {
  const filterByColourType = (palette, type) =>
    palette.filter(colour => colour.colourType === type);
  return {
    [COLOUR_TYPE.ALPHA]: filterByColourType(palette, COLOUR_TYPE.ALPHA).sort(
      sortAlpha
    ),
    [COLOUR_TYPE.OPAQUE]: filterByColourType(palette, COLOUR_TYPE.OPAQUE).sort(
      sortByHue
    ),
    [COLOUR_TYPE.GREY]: filterByColourType(palette, COLOUR_TYPE.GREY).sort(
      sortByRed
    )
  };
};

// PUBLIC API
export default flow([
  dedupe,
  setRgbPrimaryValues,
  clean,
  setNormalisedRgbPrimaryValues,
  setRgbPrimaryRangeValues,
  setColourType,
  setHue,
  sortColorsByGroup
]);
