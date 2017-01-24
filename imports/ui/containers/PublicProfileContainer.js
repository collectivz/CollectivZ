import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PublicProfileActions from '../actions/PublicProfile';
import ProfilePage from '../pages/ProfilePage';

class PublicProfileContainer extends React.Component {

  constructor(props) {
    super(props);

    PublicProfileActions.read(Meteor.userId());
  }

  render() {
    const {
      ...props
    } = this.props;

    return <ProfilePage props={props} />;
  }
}

PublicProfileContainer.propTypes = {
  user: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PublicProfileActions, dispatch),
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileContainer);
