import React from 'react'

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';

import List from '../components/List.jsx'

export default class CreateGroupPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      repertory,
      usersContact,
      loading,
      user,
    } = this.props;

    return (
      <div>
        <Breadcrumb title="Créer un groupe" hasBack={true} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                </div>
                <div>Contact(s) : </div>
                <List
                  data={usersContact}
                  type="createGroup"
                />
              </div>
            </div>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
