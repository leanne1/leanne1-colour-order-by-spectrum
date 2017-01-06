import React, { Component, PropTypes } from 'react';
import Swatch from './Swatch';
import ButtonLabelToggle from './ButtonLabelToggle';

export default class DemoPage extends Component {
	constructor() {
		super();
		this.state = {
			labelColourDefault: true
		}
	}
	static propTypes = {
		colours: PropTypes.object.isRequired,
	};
	handleButtonLabelToggleClick() {
		const { labelColourDefault } = this.state;
		this.setState({
			labelColourDefault: !labelColourDefault
		});
	}
	renderSwatches() {
		const { colours } = this.props;
		const { labelColourDefault } = this.state;
		return Object
			.keys(colours)
			.reverse()
			.map((colourList, i) => (
			<section className='colour-group' key={i}>
				<h2>{colourList}</h2>
				<Swatch
					colourList={colours[colourList]}
					labelColourDefault={labelColourDefault} />
			</section>

			));
	}
	render() {
		return (
			<section>
				<h1>Colour swatch</h1>
				<ButtonLabelToggle
					handleClick={::this.handleButtonLabelToggleClick} />
				{::this.renderSwatches()}
			</section>
		);
	}
};
