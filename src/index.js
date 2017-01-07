require('./demo/styles/index.less');
import React from 'react';
import { render } from 'react-dom';
import DemoPage from './demo/components/DemoPage';
import colours from './colour-swatch';

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
		value: '#888888',
		name: 'middleEarth'
	},
	{
		value: '#424242',
		name: 'midDarkGrey',
	},
	{
		value: '#a9a9a9',
		name: 'darkGray',
	},
	{
		value: 'rgba(30,144,255,0.8)',
		name: 'dodgerBlue80pc',
	},
	{
		value: '#696969',
		name: 'dimGrey',
	},
	{
		value: 'rgba(184,134,11,0.7)',
		name: 'goldenRod70pc',
	},
	{
		value: 'rgba(30,144,255,0.2)',
		name: 'dodgerBlue20pc',
	},
	{
		value: '#696969',
		name: 'dimGrey',
	},
	{
		value: 'rgba(184,134,11,0.4)',
		name: 'goldenRod40pc',
	},
	{
		value: 'rgba(128,0,0,0.4)',
		name: 'maroon40pc',
	},
	{
		value: '#dcdcdc',
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
		value: '#212121',
		name: 'darkerGrey',
	},
	{
		value: '#778899',
		name: 'lightSlateGray',
	},
	{
		value: 'rgba(128,0,0,0.95)',
		name: 'maroon95pc',
	},
	{
		value: '#808080',
		name: 'grey',
	},
	{
		value: 'rgba(184,134,11,1)',
		name: 'goldenRod100pc',
	},
	{
		value: '#757575',
		name: 'anotherGrey',
	},
	{
		value: '#EEEEEE',
		name: 'shimmer',
	},
];


// Utils to generate some random Hex codes for demo purposes
const generateRandomHex = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

const generateHexList = (count) => {
	const hexList = [];
	while (--count > 0) {
		let nextCount = count;
		const colour = generateRandomHex(nextCount);
		hexList.push({
			name: colour,
			value: colour,
		})
	};
	return hexList;
};
const randomHexList = generateHexList(100).filter((hex) => hex.value.length === 7);
export const finalColourList = [...randomHexList, ...startPalette];

// !!! This render must be commented out before publishing to gh-pages.
// If you publish to gh-pages with this line commented in a React error is thrown on gh-pages
// render(<DemoPage colours={colours(finalColourList)} />, document.querySelector('#app'));
