import {Component} from 'react';

import {emptyFunction} from '../core/coreUtils';

export default class BaseComponent extends Component {

    _commonMethod() {

        window.console.log(this);
    }
    
    setStateCorrectly(state, callback = false) {

        let callBack = callback === false ? emptyFunction : callback;

        if (this.mounted) {
            this.setState(state, callBack);
        }
    }
    
    componentDidMount() {
        
        this.mounted = true;
    }
    
    componentWillUnmount() {
        
        this.mounted = false;
    }
}