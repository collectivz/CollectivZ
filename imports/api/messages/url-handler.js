import React from 'react';


const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

export function replaceUrls(string) {
  const target = string.replace(urlRegex, (match) => {
    if (match[0] !== 'h') {
      return 'http://{target}';
    }
    return target;
  });

  return <a href={window.open(target, '_system')} target="_system">{target}</a>;
}
