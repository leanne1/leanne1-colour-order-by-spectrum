import compose from 'compose-function';
import isHex from 'is-hex';

const palette = [
    {
        value: 'rgba(20,133,244,0.5)',
        name: 'oceanBlue50pc'
    },
    {
        value: '86de09',
        name: 'limeGreen'
    },
    {
        value: '888888',
        name: 'middleEarth'
    }
];

/**
 * Convert a hex code to R, G and B hash
 * Currently only supports 6 char hex codes.
 * @param {String} hex - 6-char hex code
 * @returns {Object} Hash of R, G and B values
 */
 // TODO: support 3-char hex (new function to convert)
export const hexToRgb = (hex) => {
	const rgbValues = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const rgbIntValues = Array.isArray(rgbValues) ? toIntList(rgbValues, 16) : null;
	return rgbIntValues ? {
		r: rgbIntValues[1],
		g: rgbIntValues[2],
		b: rgbIntValues[3],
	} : null;
};

/**
 * Convert an RGBA code to R, G, B and alpha hash
 * @param {String} rgba - RGBA code
 * @returns {Object} Hash of R, G, B and alpha values
 */
 // TODO: support RGB
export const rgbaToRgbAlpha = (rgba) => {
	const rgbaValuesList = splitRgbaString(rgba);
	const rgbValuesList = toIntList(rgbaValuesList.slice(0,3));
	const aValue = parseFloat(rgbaValuesList[3]);
	return {
		r: rgbValuesList[0],
		g: rgbValuesList[1],
		b: rgbValuesList[2],
		alpha: aValue,
	};
};

/**
 * Check whether an RGBA string is valid
 * @param {string} rgbaString - RGBA string to check
 * @returns {boolean} Whether the string is a valid RGBA value 
 */
export const isRgba = (rgbaString) => {
	return /rgba\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/.test(rgbaString);
};

/**
 * Create a new list of integer values from a list of non-integer values
 * @param {array} list - list to transform
 * @param {number} radix - optional integer radix (defaults to 10)
 * @returns {array} New list of integer values
 */
export const toIntList = (list, radix = 10) => list.map((item) => parseInt(item, radix));

/**
 * Split an rgba string into an array of R, G, B and A values
 * @param {string} str - RGBA string to split
 * @returns {array} Array of R, G, B and A values
 */
export const splitRgbaString = (str) => str.replace('rgba(', '').replace(')', '').split(',');

/**
 * Create a new list of new colour objects from a given palette
 * @param {string} palette - List of colour objects
 * @returns {array} New list of colour objects
 */
export const deepCopy = (palette) => palette.map((colour) => Object.assign({}, colour));

/**
 * Convert a prinary R, G or B value to a normalised value fixed to 9dp
 * @param {number} primary - primary value to normalise
 * @returns {number} Normalised value to 9dp
 */
export const normalisePrimary = (primary) => Number((primary / 255).toFixed(9));

/**
 * Returns a new list of colour objects, augmenting each colour object with an RGB values hash
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const setRgbPrimaryValues = (palette) => {
	return deepCopy(palette).map((colour) => {
		const colourValue = colour.value;
		colour.rgb = isHex(colourValue) ? hexToRgb(colourValue) : 
			isRgba(colourValue) ? rgbaToRgbAlpha(colourValue) : 
			null;
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with normalised R, G and B values
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const setNormalisedRgbPrimaryValues = (palette) => {
	return deepCopy(palette).map((colour) => {
		const rgb = colour.rgb;
		colour._r = normalisePrimary(rgb.r);
		colour._g = normalisePrimary(rgb.g);
		colour._b = normalisePrimary(rgb.b);
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with R, G and B range values
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const setRgbPrimaryRangeValues = (palette) => {
	return deepCopy(palette).map((colour) => {
		const { _r, _g, _b } =  colour;
		colour.primaryMin = Math.min(_r, _g, _b);
		colour.primaryMax = Math.max(_r, _g, _b);
		colour.primaryDelta = colour.primaryMax - colour.primaryMin;
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with a colour type (greyscale, alpha, opaque)
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const setColourType = (palette) => {
	return deepCopy(palette).map((colour) => {
		const isGreyscale = colour.primaryDelta === 0;
		const isAlpha = !!colour.rgb.alpha;
		const isOpaque = !isAlpha && !isGreyscale;
		if (isGreyscale) {
			colour.colourType = 'greyscale';
		} else if (isAlpha) {
			colour.colourType = 'alpha';
		} else if (isOpaque) {
			colour.colourType = 'opaque';
		} else {
			colour.colourType = null;
		}
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with a hue property
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const setHue = (palette) => {
	return deepCopy(palette).map((colour) => {
		const colourType = colour.colourType;
		colour.hue = colourType === 'greyscale' ? null : calcHue(colour);
		return colour;
	});
};

/**
 * Calculates the hue value for a given colour
 * @param {object} colour - map of colour values
 * @returns {number} A numerical hue value
 */
export const calcHue = (colour) => {
	const { primaryMax, _r, _g, _b, primaryDelta } = colour;
	if (primaryMax === _r) {
		return 60 * ((_g - _b) / primaryDelta % 6);
	} else if (primaryMax === _g) {
		return 60 * ((_b - _r) / primaryDelta + 2); 
	} else if (primaryMax === _b) {
		return 60 * ((_r - _g) / primaryDelta + 4);
	}
};

/**
 * Returns an object containing the palette as a proprty and groups for greyscale, alpha and opaque colours
 * @param {array} palette - list of starting colours
 * @returns {object} New colour map
 */
export const makeColourTypeGroups = (palette) => ({
	palette: deepCopy(palette),
	greyscale: [],
	alpha: [],
	opaque: [],
});

// PUBLIC API
const colours = compose(
	makeColourTypeGroups,
	setHue,
	setColourType,
	setRgbPrimaryRangeValues,
	setNormalisedRgbPrimaryValues,
	setRgbPrimaryValues
)(palette);

console.warn('COLOURS', colours);

