import React from 'react';
import classNames                       from 'classnames';

export default class AvatarRow extends React.Component {
  render() {
    const {
      avatars
    } = this.props;
    
    return (
      <div className={classNames("user-list", {"large": this.props.isLarge})}>
        {
          avatars.map((avatar, index) => {
            return (<div className="user-tag only-circle" key={index}><img src={avatar}/></div>);
          })
        }
      </div>
    );
  }
}
