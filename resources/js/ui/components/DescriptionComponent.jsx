import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class DescriptionComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value,
            data: props.data,
            isHidden: true
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            value: nextProps.value || '',
            data: nextProps.data || {},
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
        
        const {data, isHidden} = this.state;

        return (
            <div className="main-description__container">
                <a
                    onClick={(event) => this._onShowDescriptionClick(event)}
                    className="main-description__control"
                    href="#"
                    title="Смотреть краткое описание"
                >
                    {data.bookName}
                </a>
                <div
                    title="Закрыть описание"
                    onClick={(event) => this._onCloseDescriptionClick(event)}
                    style={{display: isHidden ? 'none' : 'block'}}
                    className="main-description__content"
                >
                    {data.bookShortDesc + ' ...'}
                </div>
            </div>
        );
    }
};

DescriptionComponent.propTypes = {
    value: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
};

export default DescriptionComponent;