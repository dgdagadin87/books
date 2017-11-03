import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class AddComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            bookId: props.bookId,
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            bookId: nextProps.bookId || '',
            disabled: nextProps.disabled
        });
    }
    
    _addBook (event) {
        
        event.preventDefault();
        
        const {addBook} = this.props;
        const {bookId, disabled} = this.state;
        
        if (disabled) {
            return;
        }

        if (addBook) {
            addBook(bookId);
        }
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-addbook__container">
                <a
                    className={'main-addbook__control' + (disabled ? ' disabled' : '')}
                    onClick={(event)=>this._addBook(event)}
                    href="#"
                >
                    Д.
                </a>
            </div>
        );
    }
};

AddComponent.propTypes = {
    bookId: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    addBook: PropTypes.func
};

export default AddComponent;