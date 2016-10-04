const smileys = {
  "[:]['][(]": "<img src='/img/smileys/pleure.svg' />",
  "[:][)]": "<img src='/img/smileys/content.svg' />",
  "[:][(]": "<img src='/img/smileys/pascontent.svg' />",
  "[:][D]": "<img src='/img/smileys/supercontent.svg' />",
  "[;][)]": "<img src='/img/smileys/clindoeil.svg' />",
  "[:][o]": "<img src='/img/smileys/interloque.svg' />",
  "[:][p]": "<img src='/img/smileys/tirelalangue.svg' />",
  "[>][<]": "<img src='/img/smileys/supersupercontent.svg' />"
};


export function replaceParams( str ) {
  return _.keys(smileys)
          .reduce( (acc, curr) => acc.replace( new RegExp(curr, 'g'), smileys[curr] ), str );
}