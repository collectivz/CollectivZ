export default class Feedback {

  constructor(channelId) {
    this.question = {
      text: 'Pour évaluer cette action, commencez par entrer une note sur 5. Vous pouvez à tout moment écrire @stop pour annuler.',
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newFeedback',
      dialogWithZorro: [this.question],
      ongoingAction: true,
    };
    this.channelId = channelId;
    this.expectedAnswer = 'rating';
    this.result = {
      rating: 0,
      comment: ''
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
    let question = "";
    let zorroMsg = {
      text: '',
      author: 'Zorro'
    };

    if (answer === '@stop') {
      this.resetState();
    } else if (this.expectedAnswer === 'rating') {
      const rating = parseInt(answer);
      if (!Number.isSafeInteger(rating) || rating > 5 || rating < 0) {
        zorroMsg.text = `La valeur entrée n'est pas bonne, veuillez entrer un nombre entre 0 et 5.`;
        dialog.push(zorroMsg);
      } else {
        zorroMsg.text = `Très bien, veuillez maintenant laisser un commentaire.`;
        dialog.push(zorroMsg);
        this.expectedAnswer = 'comment';
        this.result.rating = rating;
      }
    } else if (this.expectedAnswer === 'comment') {
      this.result.comment = answer;
      zorroMsg.text = `Parfait, en résumé, vous voulez donner la note de ${this.result.rating}/5, avec pour commentaire "${this.result.comment}". Dites oui pour laisser cette évaluation.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'confirm';
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      Meteor.call('feedbacks.giveFeedback', this.channelId, this.result.rating, this.result.comment);
      this.resetState();
    }
  }
}
