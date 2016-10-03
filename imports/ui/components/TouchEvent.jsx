import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';

export default class TouchEvent extends Component {

    constructor( props ) {
        super( props );
        this.state = { isClicked : false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick)
            this.props.onClick();
        this.setState( { isClicked : true } );
        setTimeout( () => {
            this.setState( { isClicked : false } );
        }, 150);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div onClick={ this.handleClick } className={classNames(this.props.class, {"touch-active": this.state.isClicked})}>
              {this.props.children}
            </div>
        );
    }
}
