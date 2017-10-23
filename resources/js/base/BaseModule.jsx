import BaseComponent from './BaseComponent.jsx';

import Events from '../core/Events';

export default class BaseModule extends BaseComponent {

    constructor(props) {
        
        super(props);
        
        this.events = new Events();
    }

    _commonMethod() {
        window.console.log(this);
    }
}