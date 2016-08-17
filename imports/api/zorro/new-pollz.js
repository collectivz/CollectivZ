export const newPoll = {
  name : 'newPoll',
  toFill: ['msg', 'props', 'confirm'],
  finalAnswer: {
    msg: '',
    props: [],
  },
  questions: {
    msg: 'Pour ce sondage je vais avoir besoin de savoir quelle question vous voulez poser?',
    props: 'Entrez un choix possible, et dites @done quand c\'est fini!',
    confirm: "Dites moi oui si j'ai bien compris, vous désirez créer un sondage avec ces caractéristiques : "
  }
}
