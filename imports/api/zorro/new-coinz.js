export default class Coin {
  constructor(channelId) {
    this.question = {
      text: "Hola, je vois que vous voulez créer une levée de fond ! A quoi va servir cet argent ? Vous pouvez à tout moment écrire @annuler pour annuler.",
      author: "Zorro"
    };
    this.state = {
      inputMode: "newCoin",
      dialogWithZorro: [this.question],
      ongoingAction: true,
      choices: ["@annuler"]
    };
    this.channel = channelId;
    this.expectedAnswer = "purpose";
    this.result = {
      purpose: "",
      goal: 0
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
    } else if (this.expectedAnswer === "purpose") {
      this.result.purpose = answer;
      zorroMsg.text = "Ok, de combien avez-vous besoin ?";
      this.expectedAnswer = "goal";
      dialog.push(zorroMsg);
    } else if (this.expectedAnswer === "goal") {
      const goal = parseInt(answer);
      if (!Number.isSafeInteger(goal)) {
        zorroMsg.text = "La valeur entrée n'est pas bonne, veuillez entrer un nombre.";
        dialog.push(zorroMsg);
      } else {
        this.result.goal = goal;
        zorroMsg.text = `Vous voulez lever des fonds pour : "${this.result.purpose}" et vous avez besoin de ${this.result.goal} euros, dites oui pour confirmer.`;
        this.expectedAnswer = "confirm";
        dialog.push(zorroMsg);
        this.state.choices.push("oui");
      }
    } else if (this.expectedAnswer === "confirm") {
      if (answer === "oui" || answer === "Oui") {
        const message = {
          text: this.result.purpose,
          channelId: this.channel,
          type: "coin"
        };
        Meteor.call("coins.insert", message, this.result);
        Meteor.call("channels.stopTyping", this.channel);
        this.resetState();
      } else {
        zorroMsg.text = "Je n'ai pas compris.";
        dialog.push(zorroMsg);
      }
    }
  }
}
