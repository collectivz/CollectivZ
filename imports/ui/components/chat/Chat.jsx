import React                from 'react';
import classNames           from 'classnames';
import $                    from 'jquery';
import _                    from 'lodash';

import zorroForm            from '../../../api/zorro/zorro.js';

import ChatFilter           from './ChatFilter.jsx';
import ZorroItem            from './ZorroItem.jsx';
import MessageInput         from './MessageInput.jsx';
import MessageList          from './MessageList.jsx';
import JoinActionButton          from './JoinActionButton.jsx';

import DropDownBottom          from '../DropDownBottom.jsx';

import Modal          from '../Modal.jsx';
import Toastr          from '../Toastr.jsx';


export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      inputMode: 'message',
      zorro: {},
      dialogWithZorro: [],
      currentAction: {},
      ongoingAction: false,
      expectedAnswer: '',
      choices: [],
      messageCount: this.props.messages.length,
      displayModal: false
    };

    this.setFilterOption = this.setFilterOption.bind(this);
    this.changeInputMode = this.changeInputMode.bind(this);
    this.answerToZorro = this.answerToZorro.bind(this);
    this.filterMessage = this.filterMessage.bind(this);
  }

  componentDidMount() {
    $(".chat-sub-container").stop().animate({
      scrollTop: 10000
    }, 500);
  }

  componentDidUpdate() {
    const { channel, messages } = this.props;
    const { inputMode, ongoingAction, messageCount } = this.state;
    if (inputMode !== 'message' && !ongoingAction) {
      const zorro = zorroForm(inputMode, channel._id);
      const newState = zorro.getState();

      this.setState({
        zorro,
      });
      this.setState(newState);
    }
    if (messageCount !== messages.length) {
      Meteor.call('users.updateLastRead', channel._id);
      this.setState({
        messageCount: messages.length
      });
    }
    $(".chat-sub-container").stop().animate({
      scrollTop: 10000
    }, 500);
  }

  setFilterOption(filter) {
    this.setState({
      filter
    });
    $(".chat-sub-container").stop().animate({
      scrollTop: 10000
    }, 500);
  }

  changeInputMode(inputMode) {
    this.setState({
      inputMode
    });
  }

  hasJoined() {
    const { user, channel } = this.props;

    if (channel.type === 'channel' && !_.contains(user.subscribedChannels, channel._id)) {
      return false;
    }
    return true;
  }

  answerToZorro(answer, e) {
    if (e)
      e.preventDefault();
    const zorro = this.state.zorro;
    zorro.answerToZorro(answer);
    const newState = zorro.getState();

    this.setState(newState);
  }

  filterMessage() {
    const { messages } = this.props;
    const { filter } = this.state;
    let filteredMessages = [];

    if (filter !== 'all') {
      filteredMessages = messages.filter(message => {
        if (message.type && message.type === filter) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      filteredMessages = messages;
    }
    return filteredMessages;
  }

  render() {
    const {
      channel,
      messages,
      subChannels,
      beers,
      polls,
      coins,
      feedbacks,
      user,
    } = this.props;
    const {
      zorro,
      dialogWithZorro,
      ongoingAction,
      filter,
      choices,
      displayModal
    } = this.state;

    const filteredMessages = this.filterMessage();

    return (
      <div className={classNames("chat-sub-container", {"chat-with-filter-sub-container" : channel.connections})}>

        {!_.isEmpty(channel.connections) ?
          <ChatFilter channel={channel} setFilterOption={this.setFilterOption} />
          : ''
        }

        <div className="chat">
          <div className="chat-separator">
              <h5>Cette semaine</h5>
          </div>
          <div ref='scroll'>
            <div className="scroll">
              <div className="message-list">
                <MessageList
                  messages={filteredMessages}
                  beers={beers}
                  polls={polls}
                  subChannels={subChannels}
                  feedbacks={feedbacks}
                  coins={coins}
                  user={user}
                />
              </div>
            </div>
            {ongoingAction ?
              <div className="scroll">
                <div className="message-list">
                  {dialogWithZorro.map((message, index) => {
                    const _choices = ((index + 1) === dialogWithZorro.length) ? choices : [];
                    return (<ZorroItem message={message} key={index} answerToZorro={this.answerToZorro} choices={_choices}/>);
                  })}
                </div>
              </div>
              : ''
            }
          </div>
        </div>
        {
          this.hasJoined() ?
            <MessageInput
              inputMode={this.state.inputMode}
              changeInputMode={this.changeInputMode}
              answerToZorro={this.answerToZorro}
              channel={channel}
              toggleMarginBottom={this.toggleMarginBottom}
              hasActionPicker={true}
              user={user}
            />
          :
            <JoinActionButton channel={channel} />
        }
      </div>
    );
  }
}
