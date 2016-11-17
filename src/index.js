require('./styles/index.less');
import React from 'react'
import { render } from 'react-dom'
import Swatch from './swatch'
import colours from './colours'

render(<Swatch/>, document.querySelector('#app'));
