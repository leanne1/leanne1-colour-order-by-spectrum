require('../../src/demo/styles/index.less');
import React from 'react';
import { render } from 'react-dom';
import DemoPage from '../../src/demo/components/DemoPage';
import colours from '../../src/colour-swatch';
import { finalColourList } from '../../src'

render(<DemoPage colours={colours(finalColourList)} />, document.querySelector('#demo'));
