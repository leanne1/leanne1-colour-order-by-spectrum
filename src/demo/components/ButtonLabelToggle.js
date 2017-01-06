import React, { Component, PropTypes } from 'react';

export default class ButtonLabelToggle extends Component {
	static propTypes = {
		handleClick: PropTypes.func.isRequired
	};
	render() {
		return (
			<button
				onClick={::this.props.handleClick}>
				Toggle label colour
			</button>
		);
	}
};
