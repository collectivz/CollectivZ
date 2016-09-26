const smileys = {
  "([:][']['][(])": "😟",
  "[:]['][(]": "😢",
  "[:][)]": "☺",
  "[:][(]": "☹",
  "[:][D]": "😁",
  "[:][D]": "😃",
  "[;][)]": "😉",
  "[:][o]": "😮",
  "[:][s]": "😖",
  "[:][O]": "😚",
  "[;][p]": "😜",
  "[:][/]": "😕",
  "[>][<]": "😣",
  "[x][D]": "😆",
  "[<][3]": "♡",
  "[:s]": "😖",
  "[:][o]": "😮"
};

export function replaceParams( str ) {
  return _.keys(smileys)
          .reduce( (acc, curr) => acc.replace( new RegExp(curr, 'g'), smileys[curr] ), str );
}
