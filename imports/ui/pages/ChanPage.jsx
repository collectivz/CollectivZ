import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import Channel from '../channel/Channel.jsx';
import { zorro } from '../../api/zorro/zorro.js';
import TopNav from '../modules/topNav/TopNav.jsx';
import { Channels } from '../../api/channels/collection.js';
import { Messages } from '../../api/messages/collection.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';
import ZorroItem from '../modules/zorroItem/ZorroItem.jsx';
import MsgInput from '../modules/msgInput/MsgInput.jsx';

import './ChanPage.css';

class ChanPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputMode: 'message',
      dialogWithZorro: [],
      currentAction: {},
      ongoingAction: false,
      expectedAnswer: '',
    };
    this.changeInputMode = this.changeInputMode.bind(this);
    this.answerToZorro = this.answerToZorro.bind(this);
  }
  componentDidMount() {
    this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
    this.setState({
      count: this.props.msgs.length,
    });
  }
  componentDidUpdate() {
    if ((this.props.msgs.length + this.state.dialogWithZorro.length) !== this.state.count) {
      this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
      this.setState({
        count: this.props.msgs.length + this.state.dialogWithZorro.length,
      });
    }

    //this handle the start of a new action
    if (this.state.inputMode !== "message" && !this.state.ongoingAction) {
      const inputMode = this.state.inputMode;
      const currentAction = JSON.parse(JSON.stringify(zorro[inputMode]))[inputMode];
      const msg = {
        text: currentAction.questions[currentAction.toFill[0]],
        author: 'Zorro'
      };

      this.setState({
        currentAction,
        ongoingAction: true,
        expectedAnswer: currentAction.toFill[0],
        dialogWithZorro: this.state.dialogWithZorro.concat([msg]),
      });
    }

    //this handles the end of the current action
    if (this.state.ongoingAction) {
      const currentAction = this.state.currentAction;

      if (currentAction.toFill.length === 0) {
        this.setState({
          currentAction: {},
          ongoingAction: false,
          dialogWithZorro: [],
          expectedAnswer: ''
        });
      }
    }
  }
  changeInputMode(newMode) {
    this.setState({
      inputMode: newMode
    });
  }

  answerToZorro(answer) {
    const msg = {
      text: answer,
      author: 'self'
    };
    const currentAction = this.state.currentAction;
    const expectedAnswer = this.state.expectedAnswer;
    const dialog = this.state.dialogWithZorro;

    dialog.push(msg);
    currentAction.finalAnwser[expectedAnswer] = answer;

    const index = currentAction.toFill.indexOf(expectedAnswer);
    currentAction.toFill.splice(index, 1);

    if (currentAction.toFill.length > 0) {
      const question = currentAction.questions[currentAction.toFill[0]]
        + currentAction.finalAnwser.chanName;
      const zorroMsg = {
        text: question,
        author: 'Zorro'
      }
      dialog.push(zorroMsg);
      this.setState({
        expectedAnswer: currentAction.toFill[0],
        dialogWithZorro: dialog
      });
    } else if (expectedAnswer === 'confirm' && answer === "oui") {
      const finalAnwser = currentAction.finalAnwser;

      switch (this.state.inputMode) {
        case 'newChannel':
          const channel = {
            name: finalAnwser.chanName,
            depth: 2
          };

          Meteor.call('channels.insert', channel, this.props.chanId);
          break;
        default:
          break;
      }
      this.setState({
        currentAction: {},
        ongoingAction: false,
        dialogWithZorro: [],
        expectedAnswer: '',
        inputMode: 'message'
      });
    }
  }

  render() {
    return (
      <div>
        <TopNav text={this.props.chanName}/>
        <div className="pane">
          <div ref='scroll' className="scroll-content has-chanbar has-tabs has-footer chat ">
            <div className="scroll">
              <div className="message-list">
                {this.props.msgs.map(function(msg) {
                   return <MsgItem key={msg._id} msg={msg} />;
                })}
              </div>
              <div className="message-list">
                {this.state.dialogWithZorro.map(function(msg, index) {
                   return <ZorroItem key={index} msg={msg} />;
                })}
              </div>
            </div>
          </div>
          <MsgInput
            chanId={this.props.chanId}
            changeInputMode={this.changeInputMode}
            inputMode={this.state.inputMode}
            answerToZorro={this.answerToZorro}
          />
        </div>
      </div>
    );
  }
}

ChanPage.propTypes = {
  msgs: PropTypes.array.isRequired,
  chanName: PropTypes.string.isRequired,
  chanId: PropTypes.string.isRequired,
}

export default ChanPage;
