export default class Buddie {
  constructor(channelId) {
    this.question = {
      text: "Vous voulez ajouter un nouveau membre dans le groupe, quel est son nom d'utilisateur ou son mail ? Vous pouvez à tout moment écrire @annuler pour annuler.",
      author: "Zorro"
    };
    this.state = {
      inputMode: "newBuddie",
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ["@annuler"]
    };
    this.channelId = channelId;
    this.expectedAnswer = "username";
    this.result = {
      username: ""
    };
  }

  resetState() {
    this.state = {
      inputMode: "message",
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
      author: "self"
    };
    const dialog = this.state.dialogWithZorro;

    dialog.push(msg);
    const zorroMsg = {
      text: "",
      author: "Zorro"
    };

    if (answer === "@annuler") {
      this.resetState();
    } else if (this.expectedAnswer === "username") {
      this.result.username = answer;
      zorroMsg.text = `Vous souhaitez ajouter l'utilisateur : ${this.result.username}, dites oui pour confirmer.`;
      dialog.push(zorroMsg);
      this.expectedAnswer = "confirm";
      this.state.choices.push("oui");
    } else if (this.expectedAnswer === "confirm") {
      if (answer === "oui" || answer === "Oui") {
        Meteor.call(
          "buddies.inviteToChannel",
          this.result.username,
          this.channelId
        );
        Meteor.call("channels.stopTyping", this.channelId);
        this.resetState();
      } else {
        zorroMsg.text = "Je n'ai pas compris.";
        dialog.push(zorroMsg);
      }
    }
  }
}
