import React from "react";
import classNames from "classnames";
import $ from "jquery";
import _ from "lodash";

import zorroForm from "../../../api/zorro/zorro.js";

import ChatFilter from "./ChatFilter.jsx";
import ZorroItem from "./ZorroItem.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";
import JoinActionButton from "./JoinActionButton.jsx";

import DropDownBottom from "../DropDownBottom.jsx";

import Modal from "../Modal.jsx";
import Toastr from "../Toastr.jsx";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "all",
      inputMode: "message",
      zorro: {},
      dialogWithZorro: [],
      currentAction: {},
      ongoingAction: false,
      expectedAnswer: "",
      choices: [],
      messageCount: this.props.messages.length,
      answeringTo: "",
      scrollingUp: false
    };

    this.setFilterOption = this.setFilterOption.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.changeInputMode = this.changeInputMode.bind(this);
    this.answerToZorro = this.answerToZorro.bind(this);
    this.filterMessage = this.filterMessage.bind(this);
    this.answerToMessage = this.answerToMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidMount() {
    this.scrollDown();
  }

  scrollDown() {
    const elem = $(".chat-sub-container");
    $(".chat-sub-container").scrollTop(1000000);
  }

  componentDidUpdate() {
    const { channel, messages } = this.props;
    const {
      inputMode,
      ongoingAction,
      messageCount,
      scrollingUp
    } = this.state;

    if (inputMode !== "message" && inputMode !== "answer" && !ongoingAction) {
      const zorro = zorroForm(inputMode, channel._id);
      const newState = zorro.getState();

      this.setState({
        zorro
      });
      this.setState(newState);
    }
    if (messageCount !== messages.length) {
      Meteor.call("users.updateLastRead", channel._id);
      this.setState({
        messageCount: messages.length
      });
    }
    if(!scrollingUp) {
      this.scrollDown();
    }
  }

  setFilterOption(filter) {
    this.setState({
      filter
    });
    this.scrollDown();
  }

  changeInputMode(inputMode) {
    this.setState({
      inputMode
    });
  }

  handleScroll(e) {
    const elem = $(".chat-sub-container");
    const { scrollingUp } = this.state;
    if (!elem.scrollTop()) {
      elem.scrollTop(elem.height()/2);
      this.props.setMessageLimit()
    }
    if(elem.scrollTop() >= elem.height() - 50 && scrollingUp) {
      this.setState({
        scrollingUp: false
      });
    } else if (elem.scrollTop() <= elem.height()/2 && !scrollingUp) {
      // this.setState({
      //   scrollingUp: true
      // });
    }
  }

  answerToMessage(messageId) {
    this.setState({
      inputMode: "answer",
      answeringTo: messageId
    });
    this.scrollDown();
  }

  hasJoined() {
    const { user, channel } = this.props;
    if (_.indexOf(user.subscribedChannels, channel._id) === -1) {
      return false;
    }
    return true;
  }

  answerToZorro(answer, e) {
    if (e) {
      e.preventDefault();
    }
    const zorro = this.state.zorro;
    zorro.answerToZorro(answer);
    const newState = zorro.getState();

    this.setState(newState);
    this.scrollDown();
  }

  filterMessage() {
    const { messages } = this.props;
    const { filter } = this.state;
    let filteredMessages = [];

    if (filter !== "all") {
      filteredMessages = messages.filter(message => {
        if (message.type && message.type === filter) {
          return true;
        }
        return false;
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
      user
    } = this.props;
    const {
      zorro,
      dialogWithZorro,
      ongoingAction,
      filter,
      choices,
      answeringTo,
      inputMode
    } = this.state;

    const filteredMessages = this.filterMessage();

    return (
      <div>
        {!_.isEmpty(channel.connections)
          ? <ChatFilter
              channel={channel}
              setFilterOption={this.setFilterOption}
            />
          : ""}
        <div
          className={classNames("chat-sub-container", {
            "chat-with-filter-sub-container": !_.isEmpty(channel.connections)
          })}
          onScroll={this.handleScroll}
          ref="chatContainer"
        >

          <div className="chat">
            {/*
              <div className="chat-separator">
                <h5>Aujourd'hui</h5>
              </div>
            */}
            <div ref="scroll">
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
                    answerToMessage={this.answerToMessage}
                    channel={channel}
                  />
                </div>
              </div>
              {ongoingAction
                ? <div className="scroll">
                    <div className="message-list">
                      {dialogWithZorro.map((message, index) => {
                        const _choices = index + 1 === dialogWithZorro.length
                          ? choices
                          : [];
                        return (
                          <ZorroItem
                            message={message}
                            key={index}
                            answerToZorro={this.answerToZorro}
                            choices={_choices}
                          />
                        );
                      })}
                    </div>
                  </div>
                : ""}
            </div>
          </div>
          {this.hasJoined()
            ? <MessageInput
                inputMode={inputMode}
                changeInputMode={this.changeInputMode}
                answerToZorro={this.answerToZorro}
                channel={channel}
                toggleMarginBottom={this.toggleMarginBottom}
                hasActionPicker
                user={user}
                answeringTo={answeringTo}
              />
            : <JoinActionButton channel={channel} />}
        </div>
      </div>
    );
  }
}

Chat.contextTypes = {
  router: React.PropTypes.object
};
