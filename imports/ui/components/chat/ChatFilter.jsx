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
            
            <span>Tout voir</span>
        </TouchEvent>

        {channel.connections.pollCount ?
          <TouchEvent onClick={ () => { this.onClick('poll') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'poll'})}>
              <span>{channel.connections.pollCount}</span>
              <i className="icon icon-pie-chart"/>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.chanCount ?
          <TouchEvent onClick={ () => { this.onClick('channel') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'channel'})}>
              <span>{channel.connections.chanCount}</span>
              <i className="icon icon-cog"/>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.beerCount ?
          <TouchEvent onClick={ () => { this.onClick('beer') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'beer'})}>
              <span>{channel.connections.beerCount}</span>
              <i className="icon icon-calendar-full"/>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.feedbackCount ?
          <TouchEvent onClick={ () => { this.onClick('feedback') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'feedback'})}>
              <span>{channel.connections.feedbackCount}</span>
              <i className="icon icon-star"/>
          </TouchEvent>
          :
          ''
        }
        {channel.connections.coinCount ?
          <TouchEvent  onClick={ () => { this.onClick('coin') } } class={classNames("filter-item touch-event", {active: this.state.activeFilter == 'coin'})}>
              <span>{channel.connections.coinCount}</span>
              <i className="icon icon-euro"/>
          </TouchEvent>
          :
          ''
        }
      </div>
    );
  }
}
