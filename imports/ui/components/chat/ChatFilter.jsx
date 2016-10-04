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
            
            <i className="icon icon-undo grey"/>
        </TouchEvent>

        {channel.connections.pollCount ?
          <TouchEvent onClick={ () => { this.onClick('poll') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'poll'})}>
              <i className="icon icon-pie-chart pollz-color"/>
              <span className="pollz-color">{channel.connections.pollCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.chanCount ?
          <TouchEvent onClick={ () => { this.onClick('channel') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'channel'})}>
              <i className="icon icon-cog action-color"/>
              <span className="action-color">{channel.connections.chanCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.beerCount ?
          <TouchEvent onClick={ () => { this.onClick('beer') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'beer'})}>
              <i className="icon icon-calendar-full  event-color"/>
              <span className="event-color">{channel.connections.beerCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.feedbackCount ?
          <TouchEvent onClick={ () => { this.onClick('feedback') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'feedback'})}>
              <i className="icon icon-star  feedback-color"/>
              <span className="feedback-color">{channel.connections.feedbackCount}</span>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.coinCount ?
          <TouchEvent  onClick={ () => { this.onClick('coin') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'coin'})}>
              <i className="icon icon-euro money-color"/>
              <span className="money-color">{channel.connections.coinCount}</span>
          </TouchEvent>
          :
          ''
        }
      </div>
    );
  }
}
