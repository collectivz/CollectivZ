import React from "react";

import ToggleableList from "../components/ToggleableList";
import AppNav from "../components/AppNav.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import ChannelParser from "../components/ChannelParser";

export default class ChannelList extends React.Component {
  render() {
    const {
      groups,
      actions,
      conversations,
      user,
      unreadCounts
    } = this.props;

    const sortedGroups = groups &&
      groups.sort((a, b) => b.lastActivity - a.lastActivity);
    const sortedActions = actions &&
      actions.sort((a, b) => b.lastActivity - a.lastActivity);
    const sortedConversations = conversations &&
      conversations.sort((a, b) => b.lastActivity - a.lastActivity);

    return (
      <div className="screen-box">
        <Breadcrumb title="Récent" hasBack={false} />
        <div className="sub-container">
          <ToggleableList
            data={sortedConversations}
            user={user}
            emptyListString="Aucune discussion en cours"
            title="Discussions"
          />
          <ToggleableList
            data={sortedActions}
            user={user}
            emptyListString="Aucune action en cours"
            title="Actions"
          />
          <ToggleableList
            data={sortedGroups}
            user={user}
            emptyListString="Vous ne faites partie d'aucun groupe"
            title="Groupes"
          />
        </div>
        <AppNav user={user} />
      </div>
    );
  }
}
