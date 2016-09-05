import React from 'react';

import GuildPageHeader from '../components/GuildPageHeader.jsx';
import AppNav from '../components/AppNav.jsx';
import Loader from '../components/Loader.jsx';
import GuildBody from '../components/GuildBody.jsx';

export default class GuildPage extends React.Component {

  render() {
    const {
      loading,
      guild,
      channels,
      members,
      user
    } = this.props;

    return (
      <div>
      {loading ?
        <Loader />
        : <div>
            <GuildPageHeader guild={guild} user={user} />
            <GuildBody
              guild={guild}
              user={user}
              channels={channels}
              members={members}
            />
            <AppNav user={user}/>
          </div>
      }
      </div>
    );
  }
}
