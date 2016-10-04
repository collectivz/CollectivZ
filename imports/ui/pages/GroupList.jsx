import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import DropDown from '../components/DropDown.jsx';
import List   from '../components/List';
import GroupItem from '../components/GroupItem.jsx';
import GroupForm from '../components/GroupForm.jsx';
import { openModal } from '../helpers/Modal.js';

export default class GroupList extends Component {

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
      groups,
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
              data={groups}
              user={user}
              type="group"
              emptyListString="Il n'y a pas de groupe de discussion. Créez le votre !"
            >
              <GroupItem />
            </List>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
}
