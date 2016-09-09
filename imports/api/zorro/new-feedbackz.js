import { Meteor } from 'meteor/meteor';

export default class Feedback {

  constructor(channelId) {
    this.question = {
      text: 'Pour évaluer cette action, commencez par entrer une note sur 5. Vous pouvez à tout moment écrire @annuler pour annuler.',
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newFeedback',
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ['@annuler', '0', '1', '2', '3', '4', '5']
    };
    this.channelId = channelId;
    this.expectedAnswer = 'rating';
    this.result = {
      rating: 0,
      comment: '',
      userFeedbacks: [],
    };
    this.tempUserFeedback = {
      username: '',
      userId: '',
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

  resetTempUserFeedback() {
    this.tempUserFeedback = {
      userId: '',
      rating: 0,
      comment: ''
    };
  }

  getUserId(username) {
    const user = Meteor.users.findOne({username});
    return user ? user._id : null;
  }

  buildConfirmMessage() {
    let message = `Vous avez évalué la mission à ${this.result.rating}/5, avec pour commentaire : ${this.result.comment}.`;

    if (this.result.userFeedbacks.length) {
      message = ` Vous avez également évalué les contributeurs comme suit :`;

      this.result.userFeedbacks.forEach((feedback, index) => {
        message = message + ` ${index + 1}. ${feedback.username}, note: ${feedback.rating}/5 , commentaire: "${feedback.comment}".`;
      });
    }
    message = message + `Dites oui pour confirmer`;

    return message;
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

    if (answer === '@annuler') {
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
        this.state.choices = ['@annuler'];
      }
    } else if (this.expectedAnswer === 'comment') {
      this.result.comment = answer;
      zorroMsg.text = `Vous avez évalué la mission. Vous pouvez maintenant évaluer les contributeurs, ou finaliser votre évaluation en écrivant @fini`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'username';
      this.state.choices.push('@fini');
    } else if (answer === '@fini') {
      this.expectedAnswer = 'confirm';
      zorroMsg.text = this.buildConfirmMessage();
      dialog.push(zorroMsg);
        this.state.choices = ['@annuler', 'oui'];
    } else if (answer !== "@fini") {
      if (this.expectedAnswer === 'username') {
        const userId = this.getUserId(answer);
        if (!userId) {
          zorroMsg.test = `L'utilisateur "${answer}" n'a pas été trouvé, assurez-vous d'avoir bien tapé son nom.`;
          dialog.push(zorroMsg);
        } else {
          this.tempUserFeedback.userId = userId;
          this.tempUserFeedback.username = answer;
          this.expectedAnswer = "userRating";
          zorroMsg.text = `L'utilisateur "${answer}" a bien été ajouté. Entrez maintenant une note sur 5.`;
          dialog.push(zorroMsg);
          this.state.choices = ['@annuler', '@fini', '0', '1', '2', '3', '4', '5'];
        }
      } else if (this.expectedAnswer === "userRating") {
        const rating = parseInt(answer);
        if (!Number.isSafeInteger(rating) || rating > 5 || rating < 0) {
          zorroMsg.text = `La valeur entrée n'est pas bonne, veuillez entrer un nombre entre 0 et 5.`;
          dialog.push(zorroMsg);
        } else {
          zorroMsg.text = `Très bien, veuillez maintenant laisser un commentaire.`;
          dialog.push(zorroMsg);
          this.expectedAnswer = 'userComment';
          this.tempUserFeedback.rating = rating;
          this.state.choices = ['@annuler', '@fini'];
        }
      } else if (this.expectedAnswer === "userComment") {
        this.tempUserFeedback.comment = answer;
        this.result.userFeedbacks.push(this.tempUserFeedback);
        this.resetTempUserFeedback();
        this.expectedAnswer = 'username';
        zorroMsg.text = `Vous avez évalué un contributeur. Entrez le nom du suivant pour en évaluer un nouveau, ou écrivez @fini pour finaliser l'évalutation.`;
        dialog.push(zorroMsg);
      } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
        Meteor.call('feedbacks.giveFeedback', this.channelId, this.result);
        this.resetState();
      }
    } 
  }
}
