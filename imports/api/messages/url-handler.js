import React from 'react';


const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi);

export function replaceUrls(string) {
  const target = string.replace(urlRegex, (match) => {
    if (match[0] !== 'h') {
      return `http://${match}`;
    }
    return match;
  });
  const openUrl = aTarget => (`window.open( ${aTarget}, "_system")`);

  return `<a href=${openUrl(target, '_system')} target="_system">${target}</a>`;
}
