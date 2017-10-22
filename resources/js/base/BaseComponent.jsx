import {Component} from 'react';

export default class BaseComponent extends Component {

    _commonMethod() {
        window.console.log(this);
    }
    
    componentDidMount() {
        
        this.mounted = true;
    }
    
    componentWillUnmount() {
        
        this.mounted = false;
    }
}