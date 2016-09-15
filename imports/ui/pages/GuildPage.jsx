import React            from 'react';

import GuildPageHeader  from '../components/GuildPageHeader.jsx';
import AppNav           from '../components/AppNav.jsx';
import TopNav           from '../components/TopNav.jsx';
import Loader           from '../components/Loader.jsx';
import GuildBody        from '../components/GuildBody.jsx';


export default class GuildPage extends React.Component {

  render() {

    const { loading, guild, channels, members, user } = this.props;

    return (
      <div className="screen-box">
        {
          loading ?
            <Loader />
          :
          <div className="screen-box">
            <TopNav text="Profil du groupe"/>
            <div className="sub-container">
              <GuildPageHeader
              guild={guild}
              user={user}
              channels={channels}
              members={members}
              />
              <GuildBody
              channels={channels}
              members={members}
              />
            </div>
            <AppNav user={user}/>
          </div>
        }
      </div>
    );
  }
}
