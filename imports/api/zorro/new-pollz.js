export default class Poll {

  constructor(channelId) {
    this.question = {
      text: `Pour ce sondage je vais avoir besoin de savoir quelle question vous voulez poser?`,
      author: 'Zorro'
    };
    this.state = {
      inputMode: 'newPoll',
      dialogWithZorro: [this.question],
      ongoingAction: true,
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

    if (this.expectedAnswer === 'question') {
      this.result.question = answer;
      zorroMsg.text = `Ajoutez des choix à votre sondage, et écrivez @done quand c\'est fini ! Vous pouvez directement écrire @done si vous souhaitez créer un sondage "Pour/Contre"`;
      dialog.push(zorroMsg);
      this.expectedAnswer = 'props';
    } else if (this.expectedAnswer === 'props') {
      if (answer !== "@done") {
        this.result.props.push(answer);
        zorroMsg.text = `J'ai bien ajouté le choix ${answer}.`;
        dialog.push(zorroMsg);
      } else {
        let question = `Vous allez créer un sondage avec pour question : ${this.result.question}, et comme choix : `;
        let proposition = '';
        let choiceCount = 1;
        if (this.result.props.length) {
          this.result.props.forEach((choice) => {
            proposition = proposition + ', ' + choiceCount + ' : ' + choice;
            choiceCount++;
          });
        } else {
          proposition = '1 : Pour, 2 : Contre'
        }
        question = question + proposition + '. Dites oui pour confirmer.';
        zorroMsg.text = question;
        dialog.push(zorroMsg);
        this.expectedAnswer = 'confirm';
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
