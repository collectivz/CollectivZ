import React from 'react'

import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';

import ContactAddToGroupItem from '../components/ContactAddToGroupItem.jsx'

export default class CreateGroupPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newGroup: [],
    };

    this.addToNewGroup = this.addToNewGroup.bind(this);
    this.removeFromNewGroup = this.removeFromNewGroup.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
    this.resetNewGroup = this.resetNewGroup.bind(this);
  }

  addToNewGroup(userSelectedId) {
    if (_.contains(this.state.newGroup, userSelectedId)) {
      console.log('Vous avez déjà ajouté cette personne.');
    } else {
      this.setState({
        newGroup: this.state.newGroup.concat(userSelectedId),
      });
    }
  }

  removeFromNewGroup(userSelectedId) {
    let index = this.state.newGroup.indexOf(userSelectedId);
    this.setState({
      newGroup: this.state.newGroup.splice(index, 1),
    });
  }

  createNewGroup(e) {
    e.preventDefault();
    Meteor.call('teams.insert', this.state.newGroup);
    this.setState({
      newGroup: [],
    });
  }

  resetNewGroup(e) {
    e.preventDefault();
    this.setState({
      newGroup: [],
    });
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
        <TopNav text={'Nouveau groupe'} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                </div>
                <div>Contact(s) : </div>
                <div className="list">
                  {usersContact.map(function(userSelected) {
                     return <ContactAddToGroupItem
                              key={userSelected._id}
                              userSelected={userSelected}
                              addToNewGroup={this.addToNewGroup}
                              removeFromNewGroup={this.removeFromNewGroup}
                            />;
                  }, this)}
                </div>
              </div>
            </div>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
