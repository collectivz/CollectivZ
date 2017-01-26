const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

export function replaceUrls(string) {
  const newString = string.replace(urlRegex, (match) => {
    let newMatch = '';
    if (match[0] !== 'h') {
      newMatch = `http://${match}`;
    } else {
      newMatch = match;
    }
    const target = `window.open(${newMatch}, "_system")`;
    return `<a href="#" target=${target}>${newMatch}</a>`;
  });

  return newString;
}
