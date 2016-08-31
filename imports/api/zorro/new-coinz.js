export default class Coin {

  constructor(channelId) {
    this.question = {
      text: `Hola, je vois que vous voulez créer un coinz ! Dans quel but voulez vous lever des fonds ? Vous pouvez à tout moment écrire @stop pour annuler.`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newCoin',
      dialogWithZorro: [this.question],
      ongoingAction: true,
    };
    this.channel = channelId;
    this.expectedAnswer = 'purpose';
    this.result = {
      purpose: '',
      goal: 0,
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
    } else if (this.expectedAnswer === 'purpose') {
      this.result.purpose = answer;
      zorroMsg.text = `Et combien voulez vous lever?`;
      this.expectedAnswer = 'goal';
      dialog.push(zorroMsg);
    } else if (this.expectedAnswer === 'goal') {
      const goal = parseInt(answer);
      if ( !Number.isSafeInteger(goal)) {
        zorroMsg.text = `La valeur entrée n'est pas bonne, veuillez entrer un nombre.`;
        dialog.push(zorroMsg);
      } else {
        this.result.goal = goal;
        zorroMsg.text = `Vous voulez lever des fonds : ${this.result.purpose} et vous avez besoin de ${this.result.goal} coinz, dites oui pour confirmer.`;
        this.expectedAnswer = 'confirm';
        dialog.push(zorroMsg);
      }
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      const message = {
        text: this.result.purpose,
        channelId: this.channel,
        type: "coin",
      };
      Meteor.call('coins.insert', message, this.result);
      this.resetState();
    }
  }
}
