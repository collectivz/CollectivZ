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
          <input type="radio" name="choice" className="primary" onClick={this.voteForAPoll.bind(this, proposition._id)}/>
          <p>
            <b>{proposition.name}</b>
          </p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar success" style={{width: '37%'}}></div>
            <span>{proposition.voteRecevedFrom.length} votes reçus </span>
          </div>
        </div>
      );
    }, this);

    return (
      <div className="chat-special-bubble chat-special-bubble-poll">
          <div className="bubble-content">
              <div className="bubble-header">
                  <h4><i className="icon icon-pie-chart"/> {poll.question}</h4>
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
              <div className="poll-choice">{propositionNodes}</div>
              <button className="success button">
                Voter
              </button>
          </div>
      </div>
    );
  }
}
