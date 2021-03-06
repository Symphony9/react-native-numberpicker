import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View} from 'react-native';

var REF_PICKER = 'numberpicker';

class NumberPicker extends Component {

	constructor(props) {
		super(props);
		this.state = this._stateFromProps(props);
		this._onChange = this._onChange.bind(this);
	}

	componentWillReceiveProps(props) {
		this.props = props;
		this.setState(this._stateFromProps(props))
	}

	_stateFromProps(props) {
		return {
			selectedIndex: props.selectedIndex,
			values: props.values
		};
	}

	_onChange(event) {

		if (this.props.onSelect)
			this.props.onSelect(event.nativeEvent.value);

	}

	render() {
		var { values, style, ...otherProps } = this.props;

		return (
			<NativeNumberPicker
				ref={REF_PICKER}
				selected={this.state.selectedIndex}
				values={this.state.values}
				onChange={this._onChange}
				style={[{height:this.props.height}, style && style]}
				{...otherProps}
			/>
		);
	}
}

NumberPicker.defaultProps  = {
	selectedIndex: 0,
	height: 100,
	keyboardInputEnabled: true,
	showDivider: true
};

NumberPicker.propTypes = {
	...View.propTypes,
	height: PropTypes.number,
	selectedIndex: PropTypes.number,
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func,
	keyboardInputEnabled: PropTypes.bool,
	showDivider: PropTypes.bool
};

var NativeNumberPicker = requireNativeComponent('RNNumberPicker', NumberPicker, {
	nativeOnly: {
		onChange: true,
		selected: true,
	}
});

module.exports = NumberPicker;
