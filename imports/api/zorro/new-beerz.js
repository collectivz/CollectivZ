export default class Beer {

  constructor(channelId) {
    this.question = {
      text: 'Alors vous voulez créer un nouvel evènement à ce que je vois! C\'est à quel occasion ? Vous pouvez à tout moment écrire @annuler pour annuler.',
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newBeer',
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ['@annuler']
    };
    this.expectedAnswer = 'occasion';
    this.result = {
      occasion: '',
      date: '',
      place: '',
      channelId
    };
  }

  resetState() {
    this.state = {
      inputMode: 'message',
      ongoingAction: false,
      dialogWithZorro: [],
      zorro: {},
      choices: []
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
    } else if (this.expectedAnswer === 'occasion') {
      this.result.occasion = answer;
      zorroMsg.text = `Et où voulez vous que cet evènement ait lieu ?`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'place';
    } else if (this.expectedAnswer === 'place') {
      this.result.place = answer;
      zorroMsg.text = `Quand cela ?`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'date';
    } else if (this.expectedAnswer === 'date') {
      this.result.date = answer;
      zorroMsg.text = `Parfait, en résumé, vous voulez créer l'événement suivant : ${this.result.occasion}, lieu : ${this.result.place}, date : ${this.result.date}. Dites oui pour confirmer.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'confirm';
      this.state.choices.push('oui');
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      Meteor.call('beers.insert', this.result);
      this.resetState();
    }
  }
}
