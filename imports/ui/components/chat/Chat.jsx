import React from 'react';

import zorroForm from '../../../api/zorro/zorro.js';

import ChatFilter from './ChatFilter.jsx';
import ZorroItem from './ZorroItem.jsx';
import MessageInput from './MessageInput.jsx';
import MessageList from './MessageList.jsx';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      padding: 'small-padding',
      padding:'small-padding',
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
    this.toggleMarginBottom = this.toggleMarginBottom.bind(this);
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
  }

  changeInputMode(inputMode) {
    this.setState({
      inputMode
    });
  }

  toggleMarginBottom() {
    if (this.state.padding !== 'large-padding') {
      this.setState({
        padding: 'large-padding',
      }, () => {
        this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
      });
    } else {
      this.setState({
        padding: 'small-padding',
      }, () => {
        this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
      });
    }
  }

  answerToZorro(answer) {
    const zorro = this.state.zorro;
    zorro.answerToZorro(answer);
    const newState = zorro.getState();

    this.setState(newState, () => {
      this.refs.scroll.scrollTop += this.refs.scroll.scrollHeight;
    });
  }

  render() {
    const {
      channel,
      messages,
      subChannels,
      beers,
      polls,
      coins,
    } = this.props;
    console.log(coins);
    const {
      zorro,
      dialogWithZorro,
      ongoingAction,
      filter,
      choices
    } = this.state;

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

    return (
      <div className="view-container">
        {channel.connections ?
          <ChatFilter channel={channel} setFilterOption={this.setFilterOption} />
          : ''
        }
        <div className="pane">
          <div ref='scroll' className={this.state.padding
                      + " scroll-content has-chanbar has-tabs has-footer chat "}>

            <div className="scroll">
              <div className="message-list">
                <MessageList
                  messages={filteredMessages}
                  beers={beers}
                  polls={polls}
                  subChannels={subChannels}
                  feedbacks={channel.feedbacks}
                  coins={coins}
                />
              </div>
            </div>
            {ongoingAction ?
              <div className="scroll">
                <div className="message-list">
                  {dialogWithZorro.map((message, index) => {
                    return (<ZorroItem message={message} key={index} answerToZorro={this.answerToZorro} choices={choices}/>);
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
