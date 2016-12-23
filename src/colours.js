import compose from 'compose-function';
import curry from 'curry';
import isHex from 'is-hex';
import { COLOUR_TYPE } from './constants/config';

const startPalette = [
	{
		value: 'rgba(20,133,244,0.5)',
		name: 'oceanBlue50pc'
	},
	{
		value: 'rgba(216,22,4,0.5)',
		name: 'venetianRed50pc'
	},
	{
		value: '86de09',
		name: 'limeGreen'
	},
	{
		value: '888888',
		name: 'middleEarth'
	},
	{
		value: '222222',
		name: 'nero'
	},
	{
		value: '008080',
		name: 'teal',
	},
	{
		value: 'deb887',
		name: 'burlyWood',
	},
	{
		value: '00fa9a',
		name: 'mediumSpringGreen',
	},
	{
		value: 'FFFF00',
		name: 'yellow',
	},
	{
		value: '424242',
		name: 'midDarkGrey',
	},
	{
		value: 'a9a9a9',
		name: 'darkGray',
	},
	{
		value: '87ceeb',
		name: 'skyBlue',
	},
	{
		value: '800080',
		name: 'purple',
	},
	{
		value: 'b22222',
		name: 'fireBrick',
	},
	{
		value: 'fff8dc',
		name: 'cornSilk',
	},
	{
		value: '00ffff',
		name: 'aqua',
	},{
		value: 'ffa07a',
		name: 'salmon',
	},
	{
		value: '008000',
		name: 'green',
	},{
		value: '5f9ea0',
		name: 'cadetBlue',
	},
	{
		value: 'ff1493',
		name: 'deepPink',
	},
	{
		value: 'd2691e',
		name: 'chocolate',
	},
	{
		value: '800000',
		name: 'maroon',
	},
	{
		value: '000080',
		name: 'navy',
	},
	{
		value: 'faebd7',
		name: 'antiqueWhite',
	},
	{
		value: 'c71585',
		name: 'mediumVioletRed',
	},
	{
		value: 'rgba(30,144,255,0.8)',
		name: 'dodgerBlue80pc',
	},
	{
		value: '2e8b57',
		name: 'seaGreen',
	},
	{
		value: 'dc143c',
		name: 'crimson',
	},
	{
		value: '696969',
		name: 'dimGrey',
	},
	{
		value: '6b8e23',
		name: 'oliveDrab',
	},
	{
		value: 'rgba(184,134,11,0.7)',
		name: 'goldenRod70pc',
	},
	{
		value: 'f5f5dc',
		name: 'beige',
	},
	{
		value: 'bdb76b',
		name: 'darkKhaki',
	},
	{
		value: 'rgba(30,144,255,0.2)',
		name: 'dodgerBlue20pc',
	},
	{
		value: '696969',
		name: 'dimGrey',
	},
	{
		value: 'rgba(184,134,11,0.4)',
		name: 'goldenRod40pc',
	},
	{
		value: '5D4037',
		name: 'cocoa',
	},
	{
		value: 'rgba(128,0,0,0.4)',
		name: 'maroon40pc',
	},
	{
		value: '546E7A',
		name: 'steelBlue',
	},
	{
		value: 'dcdcdc',
		name: 'gainsborough',
	},
	{
		value: 'rgba(30,144,255,0.5)',
		name: 'dodgerBlue50pc',
	},
	{
		value: 'rgba(184,134,11,0.1)',
		name: 'goldenRod10pc',
	},
	{
		value: '212121',
		name: 'darkerGrey',
	},
	{
		value: '778899',
		name: 'lightSlateGray',
	},
	{
		value: 'rgba(128,0,0,0.95)',
		name: 'maroon95pc',
	},
	{
		value: '808080',
		name: 'grey',
	},
	{
		value: 'FF9800',
		name: 'tangerine',
	},
	{
		value: 'BDBDBD',
		name: 'iceGrey',
	},
	{
		value: 'rgba(184,134,11,1)',
		name: 'goldenRod100pc',
	},
	{
		value: '01579B',
		name: 'oceanBlue',
	},
	{
		value: '757575',
		name: 'anotheGrey',
	},{
		value: '0091EA',
		name: 'coldBlue',
	},
	{
		value: '558B2F',
		name: 'leafGreen',
	},
	{
		value: 'EEEEEE',
		name: 'shimmer',
	},
	{
		value: 'FF6F00',
		name: 'fireOrange',
	},
	{
		value: '1A237E',
		name: 'royalBlue',
	},
	{
		value: 'F50057',
		name: 'zing',
	},
	{
		value: 'D500F9',
		name: 'flowerPink',
	},
];

/**
 * Convert a hex code to R, G and B hash
 * Currently only supports 6 char hex codes.
 * @param {string} hex - 6-char hex code
 * @returns {Object} Hash of R, G and B values
 */
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
 * @param {string} rgba - RGBA code
 * @returns {Object} Hash of R, G, B and alpha values
 */
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
 * @param {Array} list - list to transform
 * @param {number} radix - optional integer radix (defaults to 10)
 * @returns {Array} New list of integer values
 */
export const toIntList = (list, radix = 10) => list.map((item) => parseInt(item, radix));

/**
 * Split an rgba string into an array of R, G, B and A values
 * @param {string} str - RGBA string to split
 * @returns {Array} Array of R, G, B and A values
 */
export const splitRgbaString = (str) => str.replace('rgba(', '').replace(')', '').split(',');

/**
 * deepCopyColourList
 * Create a new list of new colour objects from a given palette
 * @param {string} list - List of colour objects
 * @returns {Array} New list of colour objects
 */
export const copyList = curry((fn, list) => list.map(fn));
export const deepCopyColourList = copyList((colour) => Object.assign({}, colour));

/**
 * Convert a primary R, G or B value to a normalised value fixed to 9dp
 * @param {number} primary - primary value to normalise
 * @returns {number} Normalised value to 9dp
 */
export const normalisePrimary = (primary) => Number((primary / 255).toFixed(9));

/**
 * Returns a new list of colour objects, augmenting each colour object with an RGB values hash
 * @param {Array} palette - list of starting colours
 * @returns {Array} New list of colours
 */
export const setRgbPrimaryValues = (palette) => {
	return deepCopyColourList(palette).map((colour) => {
		const colourValue = colour.value;
		colour.rgb = isHex(colourValue) ? hexToRgb(colourValue) :
			isRgba(colourValue) ? rgbaToRgbAlpha(colourValue) :
				null;
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with normalised R, G and B values
 * @param {Array} palette - list of starting colours
 * @returns {Array} New list of colours
 */
export const setNormalisedRgbPrimaryValues = (palette) => {
	return deepCopyColourList(palette).map((colour) => {
		const { rgb } = colour;
		colour._r = normalisePrimary(rgb.r);
		colour._g = normalisePrimary(rgb.g);
		colour._b = normalisePrimary(rgb.b);
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with R, G and B range values
 * @param {Array} palette - list of starting colours
 * @returns {Array} New list of colours
 */
export const setRgbPrimaryRangeValues = (palette) => {
	return deepCopyColourList(palette).map((colour) => {
		const { _r, _g, _b } =  colour;
		colour.primaryMin = Math.min(_r, _g, _b);
		colour.primaryMax = Math.max(_r, _g, _b);
		colour.primaryDelta = colour.primaryMax - colour.primaryMin;
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with a colour type (greyscale, alpha, opaque)
 * @param {Array} palette - list of starting colours
 * @returns {Array} New list of colours
 */
export const setColourType = (palette) => {
	return deepCopyColourList(palette).map((colour) => {
		const { primaryDelta, rgb } = colour;
		const isGreyscale = primaryDelta === 0;
		const isAlpha = !!rgb.alpha;
		const isOpaque = !isAlpha && !isGreyscale;
		if (isGreyscale) {
			colour.colourType = COLOUR_TYPE.GREYSCALE;
		} else if (isAlpha) {
			colour.colourType = COLOUR_TYPE.ALPHA;
		} else if (isOpaque) {
			colour.colourType = COLOUR_TYPE.OPAQUE;
		} else {
			colour.colourType = null;
		}
		return colour;
	});
};

/**
 * Returns a new list of colour objects, augmenting each colour object with a hue property
 * @param {Array} palette - list of starting colours
 * @returns {Array} New list of colours
 */
export const setHue = (palette) => {
	return deepCopyColourList(palette).map((colour) => {
		const { colourType } = colour;
		colour.hue = colourType === COLOUR_TYPE.GREYSCALE ? null : calcHue(colour);
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
 * Returns a list of colours filtered by colour type
 * @param {Array} palette - list of starting colours
 * @param {Array} type - colour type to get
 * @returns {Array} Array of colours of specified colour type
 */
export const filterByColourType = (palette, type) => palette.filter((colour) => colour.colourType === type);
/**
 * @param {Array} palette - list of starting colours
 * @returns {Array} Array of alpha colours
 */
export const getAlpha = (palette) => filterByColourType(palette, COLOUR_TYPE.ALPHA);
/**
 * @param {Array} palette - list of starting colours
 * @returns {Array} Array of opaque colours
 */
export const getOpaque = (palette) => filterByColourType(palette, COLOUR_TYPE.OPAQUE);
/**
 * @param {Array} palette - list of starting colours
 * @returns {Array} Array of greyscale colours
 */
export const getGreyscale = (palette) => filterByColourType(palette, COLOUR_TYPE.GREYSCALE);

/**
 * Returns an object containing palette, alpha, opaque and greyscale lists
 * @param {Array} palette - list of starting colours
 * @returns {object} New colour map
 */
export const assignToColourType = (palette) => ({
	palette: deepCopyColourList(palette),
	[COLOUR_TYPE.ALPHA]: deepCopyColourList(getAlpha(palette)),
	[COLOUR_TYPE.OPAQUE]: deepCopyColourList(getOpaque(palette)),
	[COLOUR_TYPE.GREYSCALE]: deepCopyColourList(getGreyscale(palette)),
});

/**
 * Sort colour by hue with red hues sorted lowest
 * @param {object} a - colour object
 * @param {object} b - colour object
 * @returns {Number} Index of comparison
 */
const sortOpaque = (a, b) => a.hue - b.hue;

/**
 * Sort colour by hue and then opacity with red hues / most opaque colours sorted lowest
 * @param {object} a - colour object
 * @param {object} b - colour object
 * @returns {Number} Index of comparison
 */
const sortAlpha = (a, b) => {
	if (a.hue > b.hue) {
		return 1;
	} else if (a.hue < b.hue) {
		return -1;
	}
	if (a.alpha < b.alpha) {
		return -1;
	} else if (a.alpha > b.alpha) {
		return 1;
	} else {
		return 0;
	}
};

/**
 * Sort colour by red value (for greyscale)
 * @param {object} a - colour object
 * @param {object} b - colour object
 * @returns {Number} Index of comparison
 */
const sortGreyScale = (a, b) => a.rgb.r - b.rgb.r;

/**
 * Returns an object containing palette, alpha, opaque and greyscale lists which each colour list sorted by spectrum
 * @param {Array} palette - list of starting colours
 * @returns {object} New colour map
 */
export const sortColorsByGroup = (palette) => {
	const colourMap = assignToColourType(palette);
	colourMap[COLOUR_TYPE.OPAQUE].sort(sortOpaque);
	colourMap[COLOUR_TYPE.ALPHA].sort(sortAlpha);
	colourMap[COLOUR_TYPE.GREYSCALE].sort(sortGreyScale);
	return colourMap;
};

/**
 * Return a new colour object containing just 'value' and 'name' properties
 * @param {object} value
 * * @param {object} name
 * @returns {object} New colour map
 */
const cleanColour = ({ value, name }) => ({ value, name });

/**
 * Cleans data for delivery to view
 * @param {Array} colourMap - colour map
 * @returns {object} New colour map
 */
export const clean = (colourMap) => {
	return {
		[COLOUR_TYPE.OPAQUE]: deepCopyColourList(colourMap[COLOUR_TYPE.OPAQUE]).map(cleanColour),
		[COLOUR_TYPE.ALPHA]: deepCopyColourList(colourMap[COLOUR_TYPE.ALPHA]).map(cleanColour),
		[COLOUR_TYPE.GREYSCALE]: deepCopyColourList(colourMap[COLOUR_TYPE.GREYSCALE]).map(cleanColour),
	};
};

// PUBLIC API
const colours = compose(
	clean,
	sortColorsByGroup,
	setHue,
	setColourType,
	setRgbPrimaryRangeValues,
	setNormalisedRgbPrimaryValues,
	setRgbPrimaryValues
)(startPalette);

console.warn('COLOURS', colours);

