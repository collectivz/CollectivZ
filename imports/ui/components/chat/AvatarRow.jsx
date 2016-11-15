import React from 'react';
import classNames                       from 'classnames';

export default class AvatarRow extends React.Component {

  constructor() {
    super(props)
    this.state = {};
  }

  render() {
    const {
      avatars
    } = this.props;
    console.log(avatars);
    if (avatars.length >= 4)
      console.log(1);
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
