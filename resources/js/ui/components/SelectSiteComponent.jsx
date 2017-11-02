import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class SelectSiteComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            disabled: props.disabled,
            selectedSiteId: props.selectedSiteId
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            disabled: nextProps.disabled,
            selectedSiteId: nextProps.selectedSiteId
        });
    }
    
    _changeSite (event) {
        
        console.log(event.currentTarget);
    }

    _renderOptions() {
        
        const {items = []} = this.props;
        const {selectedSiteId} = this.state;
        
        let optionArray = [];
        
        optionArray.push(
            <option
                key={0}
                value={-1}
                selected={selectedSiteId == -1 ? true : false}
            >
                Выберите сайт для поиска
            </option>
        );
        
        for (let i = 1; i <= items.length; i++) {
            let currentItem = items[i-1];
            optionArray.push(
                <option
                    key={i}
                    value={currentItem['id']}
                    selected={selectedSiteId == currentItem['id'] ? true : false}
                >
                    {currentItem['name']}
                </option>
            );
        }
        
        return optionArray;
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-selectsite__container">
                <select
                    disabled={disabled}
                    className={'main-selectsite__select'}
                    onChange={this._changeSite.bind(this)}
                >
                {this._renderOptions()}
                </select>
            </div>
        );
    }
};

SelectSiteComponent.propTypes = {
    items: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    selectedSiteId: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectSiteComponent;