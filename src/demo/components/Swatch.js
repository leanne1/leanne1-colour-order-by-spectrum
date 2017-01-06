import React, { Component, PropTypes } from 'react';

export default class Swatch extends Component {
	static propTypes = {
		colourList: PropTypes.array.isRequired,
		labelColourDefault: PropTypes.bool.isRequired,
	};
	renderSwatch() {
		const {
			colourList,
			labelColourDefault
		} = this.props;

		return (
			<ul className='swatch-list'>
				{ colourList.map((colour, i) => (
					<li key={i}>
						<div className='swatch'>
							<div
								className={`swatch-label ${labelColourDefault ? 'text-light' : 'text-dark'}`}
								style={{backgroundColor:colour.value}}>
								<span className='swatch-label-name'>{colour.name}</span>
								<span className='swatch-label-code'>{colour.value}</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	}
	render() {
		return ::this.renderSwatch();
	}
};
