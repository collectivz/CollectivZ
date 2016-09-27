import React            from 'react';

import DropDownBottom from '../DropDownBottom';
import PollEdit from './PollEdit';
import { Toast }         from '../../helpers/Toast';
import { openModal }         from '../../helpers/Modal';

export default class PollItem extends React.Component {

  constructor(props) {
    super(props);

    this.openEdit = this.openEdit.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }

  openEdit() {
    const {
      poll
    } = this.props;
    const component = <PollEdit poll={poll} />;
    openModal(component, "Modifier la question du sondage.");
  }

  deletePoll() {
    const {
      poll
    } = this.props;

    Meteor.call('polls.delete', poll._id);
  }

  voteForAPoll(propositionId) {
    Meteor.call('polls.vote', this.props.poll._id, propositionId, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  render() {
    const {
      poll,
      propositions,
      user
    } = this.props;

    const propositionNodes = propositions.map(function(proposition, i) {
      return (
        <div key={proposition._id}>
          <p>
            {proposition.name}
          </p>
          <p>
            {proposition.voteRecevedFrom.length} votes reçus
          </p>
          <button className="primary button" onClick={this.voteForAPoll.bind(this, proposition._id)}>
            Vote pour ce choix
          </button>
        </div>
      );
    }, this);

    return (
      <div className="chat-special-bubble chat-special-bubble-poll">
          <div className="bubble-content">
              <i className="big-icon icon icon-pie-chart"/>
              <div className="bubble-header">
                  <i className="icon icon-pie-chart"/>
                  <span>Nouveau Pollz !</span>
                  {
                    (poll.author === user._id || user.isAdmin) ?
                      <DropDownBottom>
                        <ul>
                          <li><a className="drop-down-menu-link" onClick={this.deletePoll}> Supprimer le sondage </a></li>
                          <li><a className="drop-down-menu-link" onClick={this.openEdit}> Modifier la question </a></li>
                        </ul>
                      </DropDownBottom>
                    : ''
                  }
              </div>
              <h3>{poll.question}</h3>
              <div className="poll-choice">{propositionNodes}</div>
          </div>
      </div>
    );
  }
}
