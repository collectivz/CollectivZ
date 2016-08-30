export default class Buddie {

  constructor(channelId) {
    this.question = {
      text: `Vous voulez ajouter un nouveau justicier dans le groupe, quel est son nom d'utilisateur ou son mail ? Vous pouvez à tout moment écrire @stop pour annuler.`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newBuddie',
      dialogWithZorro: [this.question],
      ongoingAction: true,
    };
    this.channelId = channelId;
    this.expectedAnswer = 'username';
    this.result = {
      username: ''
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


    if (answer === '@stop') {
      this.resetState();
    } else if (this.expectedAnswer === 'username') {
      this.result.username = answer;
      zorroMsg.text = `Vous souhaitez ajouter l'utilisateur : ${this.result.username}, dites oui pour confirmer.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'confirm';
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      Meteor.call('buddies.inviteToChannel', this.result.username, this.channelId);
      this.resetState();
    }
  }
}
