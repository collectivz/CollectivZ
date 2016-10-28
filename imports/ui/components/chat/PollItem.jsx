import React            from 'react';

import DropDownBottom from '../DropDownBottom';
import PollEdit from './PollEdit';
import { Toast }         from '../../helpers/Toast';
import { openModal }         from '../../helpers/Modal';

export default class PollItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProposition: ''
    };

    this.openEdit = this.openEdit.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
    this.voteForAPoll = this.voteForAPoll.bind(this);
  }

  openEdit() {
    const {
      poll
    } = this.props;
    const component = <PollEdit poll={poll} />;
    openModal(component, "Modifier la question du sondage.");
  }

  hasVoted() {
    const {
      user,
      propositions
    } = this.props;

    if (propositions.length) {
      return propositions.some(proposition => {
        return proposition.voteReceivedFrom.some(id => {
          return id === user._id;
        });
      });
    }
  }

  deletePoll() {
    const {
      poll
    } = this.props;

    Meteor.call('polls.delete', poll._id);
  }

  selectProposition(propositionId) {
    this.setState({
      selectedProposition: propositionId
    });
  }

  getVotePercent(proposition) {
    const {
      poll
    } = this.props;
    const percent = (proposition.voteReceivedFrom.length * 100) / poll.totalVote || 0;

    return {
      width: percent + '%'
    };
  }

  voteForAPoll() {
    const {
      selectedProposition
    } = this.state;

    Meteor.call('polls.vote', this.props.poll._id, selectedProposition, (err, res) => {
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
          {
            !this.hasVoted() ?
              <input type="radio" name="choice" className="primary" onClick={this.selectProposition.bind(this, proposition._id)}/>
            :
              ''
          }
          <p>
            <b>{proposition.name}</b>
          </p>
          {
            this.hasVoted() ?
              <div className="progress-bar-wrapper">
                <div className="progress-bar success" style={this.getVotePercent(proposition)}></div>
                <span>{proposition.voteReceivedFrom.length} votes reçus </span>
              </div>
            :
              ''
          }
        </div>
      );
    }, this);

    return (
      <div className="chat-special-bubble chat-special-bubble-poll">
          <div className="bubble-content">
              <div className="bubble-header">
                  <h4><i className="icon icon-pie-chart icon-pollz-color"/> {poll.question}</h4>
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
              {
                this.hasVoted() ?
                  <div className="success-box">
                    <h4><i className="icon icon-check"/>Vous avez déjà voté.</h4>
                  </div>
                :
                  <div className="button-box">
                    <button className="success button" onClick={this.voteForAPoll}>
                      Voter
                    </button>
                  </div>
              }
          </div>
      </div>
    );
  }
}
