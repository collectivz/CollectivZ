import React from 'react';

import TouchEvent                               from '../TouchEvent';
import classNames                               from 'classnames';


export default class ChatFilter extends React.Component {

  constructor( props ) {
      super( props );
      this.state = {activeFilter: 'all'};
  }

  onClick(dest) {

    this.setState({
      activeFilter: dest
    });

    this.props.setFilterOption(dest);
      $(".chat-sub-container").stop().animate({
        scrollTop: 10000
      }, 300);
  }

  render() {

    const { channel, setFilterOption } = this.props;

    return (
      <div className="chat-filter">

        <TouchEvent onClick={ () => { this.onClick('all') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'all'})}>

            {/*}<i className="icon icon-undo grey"/>*/}
            Tout
        </TouchEvent>

        {channel.connections.channelCount ?
          <TouchEvent onClick={ () => { this.onClick('channel') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'channel'}, {more: channel.connections.channelCount >= 10})}>
              <i className="icon icon-action action-color"/>
              <span className="action-color">{channel.connections.channelCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.beerCount ?
          <TouchEvent onClick={ () => { this.onClick('beer') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'beer'}, {more: channel.connections.beerCount >= 10})}>
              <i className="icon icon-event2  event-color"/>
              <span className="event-color">{channel.connections.beerCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.coinCount ?
          <TouchEvent  onClick={ () => { this.onClick('coin') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'coin'}, {more: channel.connections.coinCount >= 10})}>
              <i className="icon icon-euro money-color"/>
              <span className="money-color">{channel.connections.coinCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.feedbackCount ?
          <TouchEvent onClick={ () => { this.onClick('feedback') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'feedback'}, {more: channel.connections.feedbackCount >= 10})}>
              <i className="icon icon-star  feedback-color"/>
              <span className="feedback-color">{channel.connections.feedbackCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.pollCount ?
          <TouchEvent onClick={ () => { this.onClick('poll') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'poll'}, {more: channel.connections.pollCount >= 10})}>
              <i className="icon icon-pie-chart pollz-color"/>
              <span className="pollz-color">{channel.connections.pollCount}</span>
          </TouchEvent>
          :
          ''
        }
      </div>
    );
  }
}
