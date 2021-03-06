import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class DeleteComponent extends BaseComponent {

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
    
    _deleteBook () {

        const {deleteBook} = this.props;
        const {bookId, disabled} = this.state;
        
        if (disabled) {
            return;
        }

        if (deleteBook) {
            deleteBook(bookId);
        }
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-deletebook__container">
                <div
                    className={'main-deletebook__control' + (disabled ? ' disabled' : '')}
                    onClick={(event)=>this._deleteBook(event)}
                    title="Удалить книгу"
                />
            </div>
        );
    }
};

DeleteComponent.propTypes = {
    bookId: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    deleteBook: PropTypes.func
};

export default DeleteComponent;