import { Meteor } from 'meteor/meteor';

import Channel from './new-channel.js';
import Beer from './new-beerz.js';
import Poll from './new-pollz.js';
import Buddie from './new-buddies.js';
import Feedback from './new-feedbackz.js';
import Coin from './new-coinz.js';

export default function zorroForm(type, channelId) {
  switch (type) {
    case 'newFeedback':
      return new Feedback(channelId);
    case 'newBuddie':
      return new Buddie(channelId);
    case 'newBeer':
      return new Beer(channelId);
    case 'newChannel':
      return new Channel(channelId);
    case 'newPoll':
      return new Poll(channelId);
    case 'newCoin':
      return new Coin(channelId);
    default:
      break;
  }
}
