export default class Poll {

  constructor(channelId) {
    this.question = {
      text: `Pour ce sondage je vais avoir besoin de savoir quelle question vous voulez poser ? Vous pouvez à tout moment écrire @annuler pour annuler.`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newPoll',
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ['@annuler']
    };
    this.channelId = channelId;
    this.expectedAnswer = 'question';
    this.result = {
      question: '',
      props: []
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
    } else if (this.expectedAnswer === 'question') {
      this.result.question = answer;
      zorroMsg.text = `Ajoutez des choix à votre sondage, et écrivez @fini quand c\'est fini ! Vous pouvez directement écrire @fini si vous souhaitez créer un sondage "Pour/Contre"`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'props';
      this.state.choices.push('@fini');
    } else if (this.expectedAnswer === 'props') {
      if (answer !== "@fini") {
        this.result.props.push(answer);
        zorroMsg.text = `J'ai bien ajouté le choix "${answer}".`;
        dialog.push(zorroMsg);
      } else {
        if (this.result.props.length > 1 || !this.result.props.length) {
          let question = `Vous allez créer un sondage avec pour question : "${this.result.question}", et comme choix : `;
          let proposition = '';
          let choiceCount = 1;
          if (this.result.props.length) {
            this.result.props.forEach((choice) => {
              proposition = `${proposition}, ${choiceCount} : "${choice}"`;
              choiceCount++;
            });
          } else {
            proposition = '1 : "Pour", 2 : "Contre"'
          }
          question = question + proposition + '. Dites oui pour confirmer.';
          zorroMsg.text = question;
          dialog.push(zorroMsg);
          this.expectedAnswer = 'confirm';
          this.state.choices = ['@annuler', 'oui'];
        } else {
          zorroMsg.text = `Vous devez entrer au moins 2 choix pour créer un sondage.`;
          dialog.push(zorroMsg);
        }
      }
    } else if (this.expectedAnswer === 'confirm' && (answer === 'oui' || answer === 'Oui')) {
      const pollMsg = {
        text: this.result.question,
        channelId: this.channelId,
        type: "poll",
      };
      Meteor.call('polls.insert', pollMsg, this.result.props);
      this.resetState();
    }
  }
}
