import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import DropDown from '../components/DropDown.jsx';
import List   from '../components/List';
import GuildItem from '../components/GuildItem.jsx';
import GroupForm from '../components/GroupForm.jsx';
import { openModal } from '../helpers/Modal.js';

export default class GuildList extends Component {

  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    const component = <GroupForm />;

    openModal(component, "Créer un nouveau groupe");
  }

  render() {
    const {
      guilds,
      user
    } = this.props;

    return (
      <div className="screen-box">
        <Breadcrumb title="Groupes" hasBack={false}>
          <DropDown>
            <ul>
              <li><a className="drop-down-menu-link" onClick={this.openModal}> Créer un groupe </a></li>
            </ul>
          </DropDown>
        </Breadcrumb>
          <div className="sub-container">
            <List
              data={guilds}
              user={user}
              type="guild"
              emptyListString="Il n'y a pas de groupe de discussion. Créez le votre !"
            >
              <GuildItem />
            </List>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}

GuildList.propTypes = {
  guilds: PropTypes.array.isRequired,
}
