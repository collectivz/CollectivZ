import { Meteor } from 'meteor/meteor';

import newChannel from './new-channel.js';
import newBeer from './new-beerz.js';
import newPoll from './new-pollz.js';
import newBuddie from './new-buddies.js';

export const zorro = {
  newChannel,
  newBeer,
  newPoll,
  newBuddie
};

export default class Zorro {

  constructor(type, channelId) {
    this.currentAction = JSON.parse(JSON.stringify(zorro[type]))[type];
    this.question = {
      text: this.currentAction.questions[this.currentAction.toFill[0]],
      author: 'Zorro'
    };
    this.state = {
      inputMode: type,
      dialogWithZorro: [this.question],
      currentAction: this.currentAction,
      ongoingAction: true,
      expectedAnswer: this.currentAction.toFill[0],
    };
    this.channelId = channelId;
  }

  resetState() {
    this.state = {
      inputMode: 'message',
      currentAction: {},
      ongoingAction: false,
      dialogWithZorro: [],
      expectedAnswer: '',
      zorro: {}
    };
  }

  getState() {
    return this.state;
  }

  getDialog() {
    return this.state.dialogWithZorro;
  }

  answerToZorro(answer) {
    const msg = {
      text: answer,
      author: 'self'
    };
    const currentAction = this.currentAction;
    const dialog = this.state.dialogWithZorro;

    dialog.push(msg);
    let index;
    let question = "";
    let zorroMsg = {};
    if (currentAction.name === 'newBuddie') {
      Meteor.call('buddies.inviteToChannel', answer, this.channelId, (err, res) => {
        if (err) {
          zorroMsg = {
            text: 'Utilisateur non trouvé !',
            author: 'Zorro'
          };
        } else {
          zorroMsg = {
            text: 'Trouvé et ajouté!',
            author: 'Zorro'
          };
        }
      });
      dialog.push(zorroMsg);
      this.resetState();
    } else if (currentAction.name === "newPoll") {
      if (this.state.expectedAnswer === "question" || answer === "@done") {
        if (answer !== "@done") {
          currentAction.finalAnswer[this.state.expectedAnswer] = answer;
        }
        index = currentAction.toFill.indexOf(this.state.expectedAnswer);
        currentAction.toFill.splice(index, 1);
        question = currentAction.questions[currentAction.toFill[0]];
        if (answer === '@done') {
          question = question + '\n' + 'Question : ' + currentAction.finalAnswer.msg;
          let proposition = '';
          let choiceCount = 1;
          currentAction.finalAnswer.props.forEach((choice) => {
            proposition = proposition + '\n' + 'Proposition ' + choiceCount + ' : ' + choice;
            choiceCount++;
          })
          question = question + proposition;
        }
        zorroMsg = {
          text: question,
          author: 'Zorro'
        };
        dialog.push(zorroMsg);
        this.state.expectedAnswer = currentAction.toFill[0];
        }
      if (this.state.expectedAnswer === "props" && answer !== "@done") {
        currentAction.finalAnswer[this.state.expectedAnswer].push(answer);
      }
      if (this.state.expectedAnswer === "confirm" && (answer === "oui" || answer === "Oui")) {
        const pollMsg = {
          text: currentAction.finalAnswer.msg,
          channelId: this.channelId,
          type: "poll",
        };
        Meteor.call('polls.insert', pollMsg, currentAction.finalAnswer.props);
        this.resetState();
      }
    } else if (this.state.expectedAnswer !== 'confirm') {
      currentAction.finalAnswer[this.state.expectedAnswer] = answer;
      index = currentAction.toFill.indexOf(this.state.expectedAnswer);
      currentAction.toFill.splice(index, 1);

      if (currentAction.toFill.length > 0) {
        if (this.state.expectedAnswer === 'confirm') {
          question = currentAction.questions[currentAction.toFill[0]]
            + currentAction.finalAnswer.chanName;
        } else {
          question = currentAction.questions[currentAction.toFill[0]]
        }
        zorroMsg = {
          text: question,
          author: 'Zorro'
        };
        dialog.push(zorroMsg);
        this.state.expectedAnswer = currentAction.toFill[0];
      }
    } else if (this.state.expectedAnswer === 'confirm' && answer === "oui") {
      const finalAnswer = currentAction.finalAnswer;

      switch (this.state.inputMode) {
        case 'newChannel':
          const channel = {
            name: finalAnswer.chanName,
            depth: 2
          };
          Meteor.call('channels.insert', channel, this.channelId);
          break;
        case 'newBeer':
          const beer = {
            occasion: finalAnswer.occasion,
            date: finalAnswer.date,
            place: finalAnswer.place,
            channelId: this.channelId
          };
          Meteor.call('beers.insert', beer);
          break;
        default:
          break;
      }
      this.resetState();
    }
  }
}
