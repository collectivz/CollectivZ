export default class Channel {

  constructor(channelId) {
    this.question = {
      text: `Hola, je vois que vous voulez créer une nouvelle action ! Quel nom allez-vous lui donner ? Vous pouvez à tout moment écrire @annuler pour annuler.`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newChannel',
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ['@annuler']
    };
    this.channelId = channelId;
    this.expectedAnswer = 'chanName';
    this.result = {
      name: ''
    };
  }

  resetState() {
    this.state = {
      inputMode: 'message',
      ongoingAction: false,
      dialogWithZorro: [],
      zorro: {}
    };
  }

  getState() {
    return this.state;
  }

  answerToZorro(answer) {
    const msg = {
      text: answer,
      author: 'self'
    };
    const dialog = this.state.dialogWithZorro;

    dialog.push(msg);
    let zorroMsg = {
      text: '',
      author: 'Zorro'
    };

    if (answer === '@annuler') {
      this.resetState();
    } else if (this.expectedAnswer === 'chanName') {
      this.result.name = answer;
      zorroMsg.text = `Vous souhaitez créer l'action : ${this.result.name}, dites oui pour confirmer.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'confirm';
      this.state.choices.push('oui');
    } else if (this.expectedAnswer === 'confirm') {
      if (answer === 'oui' || answer === 'Oui') {
        Meteor.call('channels.insert', this.result, this.channelId);
        this.resetState();
      } else {
        zorroMsg.text = `Je n'ai pas compris.`;
        dialog.push(zorroMsg);
      }
    }
  }
}
