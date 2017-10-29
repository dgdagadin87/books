import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class DescriptionComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value,
            isHidden: true
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            value: nextProps.value || '',
            isHidden: true
        });
    }

    _onShowDescriptionClick(event) {
        
        event.preventDefault();
        
        const {isHidden} = this.state;
        
        this.setStats({
            isHidden: !isHidden
        });
    }
    
    _onCloseDescriptionClick(event) {
        
        event.preventDefault();
        
        this.setStats({
            isHidden: true
        });
    }

    render() {
        
        const {value, isHidden} = this.state;

        return (
            <div className="main-description__container">
                <a
                    onClick={(event) => this._onShowDescriptionClick(event)}
                    className="main-description__control"
                    href="#"
                >
                    Смотреть
                </a>
                <div
                    title="Закрыть описание"
                    onClick={(event) => this._onCloseDescriptionClick(event)}
                    style={{display: isHidden ? 'none' : 'block'}}
                    className="main-description__content"
                >
                    {value + ' ...'}
                </div>
            </div>
        );
    }
};

DescriptionComponent.propTypes = {
    value: PropTypes.string.isRequired
};

export default DescriptionComponent;