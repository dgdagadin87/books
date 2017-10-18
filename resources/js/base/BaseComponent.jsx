import React, {Component} from 'react';

export default class BaseComponent extends Component {

	_commonMethod() {
		window.console.log(this);
	}
}