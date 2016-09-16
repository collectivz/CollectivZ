import React                from 'react';
import classNames           from 'classnames';
import $                    from 'jquery';

import zorroForm            from '../../../api/zorro/zorro.js';

import ChatFilter           from './ChatFilter.jsx';
import ZorroItem            from './ZorroItem.jsx';
import MessageInput         from './MessageInput.jsx';
import MessageList          from './MessageList.jsx';


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
      choices: []
    };

    this.setFilterOption = this.setFilterOption.bind(this);
    this.changeInputMode = this.changeInputMode.bind(this);
    this.answerToZorro = this.answerToZorro.bind(this);
  }

  componentDidMount() {
    this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
  }

  componentDidUpdate() {
    if (this.state.inputMode != 'message' && !this.state.ongoingAction) {
      const zorro = zorroForm(this.state.inputMode, this.props.channel._id);
      const newState = zorro.getState();

      this.setState({
        zorro,
      });
      this.setState(newState);
    }
    this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
  }

  setFilterOption(filter) {
    this.setState({
      filter
    });
    this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
  }

  changeInputMode(inputMode) {
    this.setState({
      inputMode
    });
  }

  answerToZorro(answer, e) {
    if (e)
      e.preventDefault();
    const zorro = this.state.zorro;
    zorro.answerToZorro(answer);
    const newState = zorro.getState();

    this.setState(newState);
    $(".chat-sub-container").stop().animate({
      scrollTop: 10000
    }, 500);
  }

  render() {

    const { channel, messages, subChannels, beers, polls, coins, feedbacks, user } = this.props;
    const { zorro, dialogWithZorro, ongoingAction, filter, choices } = this.state;

    let filteredMessages = [];

    if (filter !== 'all') {
      filteredMessages = messages.filter(message => {
        if (message.type && message.type === this.state.filter) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      filteredMessages = messages;
    }
    Meteor.call('users.markAsSeen', channel._id);

    return (
      <div className={classNames("chat-sub-container", {"chat-with-filter-sub-container" : channel.connections})}>

        {channel.connections ?
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
        <MessageInput
          inputMode={this.state.inputMode}
          changeInputMode={this.changeInputMode}
          answerToZorro={this.answerToZorro}
          channelId={channel._id}
          toggleMarginBottom={this.toggleMarginBottom}
        />
      </div>
    );
  }
}
