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
 * Returns a new list of colour objects, augmenting each colour object with an RGB values hash
 * @param {array} palette - list of starting colours
 * @returns {array} New list of colours
 */
export const getRgb = (palette) => {
	return palette.map((colour) => {
		const nextColour = Object.assign({}, colour);
		const colourValue = nextColour.value;
		nextColour.rgb = isHex(colourValue) ? hexToRgb(colourValue) : 
				isRgba(colourValue) ? rgbaToRgbAlpha(colourValue) : 
				null;
		return nextColour;
	});
};

const colours = compose(getRgb)(palette);
