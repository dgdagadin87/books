import {Component} from 'react';

import Events from '../core/Events';

export default class BaseModule extends Component {

    constructor(props) {
        
        super(props);
        
        this.events = new Events();
    }

    _commonMethod() {
        window.console.log(this);
    }
}