import React               from 'react'

import List                from '../components/List.jsx';
import AppNav              from '../components/AppNav.jsx';
import Breadcrumb          from '../components/Breadcrumb.jsx';

export default class ChannelList extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInvited = this.refs.userInvited.value;

    if (userInvited) {
      Meteor.call('channels.conversationCreate', userInvited);
      this.refs.userInvited.value = '';
    }
  }

  render() {
    const {
      channels,
      conversations,
      user
    } = this.props;

    const sortedChannels = channels.sort((a, b) => {
      return b.lastActivity - a.lastActivity;
    });
    const sortedConversations = conversations.sort((a, b) => {
      return b.lastActivity - a.lastActivity;
    });

    return (
      <div className="screen-box">
        <Breadcrumb title="Récent" hasBack={false} />
          <div className="sub-container">
            <div className="list">
              {/* <div className="list-sub-menu">
                  <i className="big-icon icon icon-bubble"></i>
                  <h5>Liste de mes groupes de discussion</h5>
              </div> */}
              <List data={sortedChannels} user={user} type="channel" />
              <div className="list-sub-menu">
                  <i className="big-icon icon icon-users"></i>
                  <h5>Liste de mes conversations privées</h5>
                  <form className="merged">
                    <fieldset className="small has-icon">
                      <i className="icon icon-user"></i>
                      <input
                        className="small"
                        type="text"
                        ref="userInvited"
                        placeholder="Ajouter un utilisateur"
                      />
                    </fieldset>
                    <button className="small primary button" onClick={this.handleSubmit}>
                      <i className="icon icon-rotate-45 icon-cross"/>
                    </button>
                  </form>
              </div>
              <List data={sortedConversations} user={user} type="conversation" />
            </div>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
