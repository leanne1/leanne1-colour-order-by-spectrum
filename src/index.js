require('./demo/styles/index.less');
import React from 'react'
import { render } from 'react-dom'
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
		value: '#86de09',
		name: 'limeGreen'
	},
	{
		value: '#888888',
		name: 'middleEarth'
	},
	{
		value: '#008080',
		name: 'teal',
	},
	{
		value: '#deb887',
		name: 'burlyWood',
	},
	{
		value: '#00fa9a',
		name: 'mediumSpringGreen',
	},
	{
		value: '#FFFF00',
		name: 'yellow',
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
		value: '#87ceeb',
		name: 'skyBlue',
	},
	{
		value: '#800080',
		name: 'purple',
	},
	{
		value: '#b22222',
		name: 'fireBrick',
	},
	{
		value: '#fff8dc',
		name: 'cornSilk',
	},
	{
		value: '#00ffff',
		name: 'aqua',
	},
	{
		value: '#ffa07a',
		name: 'salmon',
	},
	{
		value: '#008000',
		name: 'green',
	},{
		value: '#5f9ea0',
		name: 'cadetBlue',
	},
	{
		value: '#ff1493',
		name: 'deepPink',
	},
	{
		value: '#d2691e',
		name: 'chocolate',
	},
	{
		value: '#800000',
		name: 'maroon',
	},
	{
		value: '#000080',
		name: 'navy',
	},
	{
		value: '#faebd7',
		name: 'antiqueWhite',
	},
	{
		value: '#c71585',
		name: 'mediumVioletRed',
	},
	{
		value: 'rgba(30,144,255,0.8)',
		name: 'dodgerBlue80pc',
	},
	{
		value: '#2e8b57',
		name: 'seaGreen',
	},
	{
		value: '#dc143c',
		name: 'crimson',
	},
	{
		value: '#696969',
		name: 'dimGrey',
	},
	{
		value: '#6b8e23',
		name: 'oliveDrab',
	},
	{
		value: 'rgba(184,134,11,0.7)',
		name: 'goldenRod70pc',
	},
	{
		value: '#f5f5dc',
		name: 'beige',
	},
	{
		value: '#bdb76b',
		name: 'darkKhaki',
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
		value: '#5D4037',
		name: 'cocoa',
	},
	{
		value: 'rgba(128,0,0,0.4)',
		name: 'maroon40pc',
	},
	{
		value: '#546E7A',
		name: 'steelBlue',
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
		value: '#FF9800',
		name: 'tangerine',
	},
	{
		value: '#BDBDBD',
		name: 'iceGrey',
	},
	{
		value: 'rgba(184,134,11,1)',
		name: 'goldenRod100pc',
	},
	{
		value: '#01579B',
		name: 'oceanBlue',
	},
	{
		value: '#757575',
		name: 'anotheGrey',
	},{
		value: '#0091EA',
		name: 'coldBlue',
	},
	{
		value: '#558B2F',
		name: 'leafGreen',
	},
	{
		value: '#EEEEEE',
		name: 'shimmer',
	},
	{
		value: '#FF6F00',
		name: 'fireOrange',
	},
	{
		value: '#1A237E',
		name: 'royalBlue',
	},
	{
		value: '#F50057',
		name: 'zing',
	},
	{
		value: '#D500F9',
		name: 'flowerPink',
	},
];

const reds = [
	{
		value: '#ffa07a',
		name: 'salmon',
	},
	{
		value: '#FF6F00',
		name: 'fireOrange',
	},
	{
		value: '#FF9800',
		name: 'tangerine',
	},
	{
		value: '#d2691e',
		name: 'chocolate',
	},
	{
		value: '#deb887',
		name: 'burlyWood',
	},
	{
		value: '#b22222',
		name: 'fireBrick',
	},
];

console.warn(colours(reds));
render(<DemoPage colours={colours(reds)} />, document.querySelector('#app'));
