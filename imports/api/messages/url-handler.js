const urlRegex = new RegExp(
  /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
);

export function replaceUrls(string) {
  const target = string.replace(urlRegex, aMatch => {
    let match = aMatch;
    if (Meteor.isCordova)
      window.open = cordova.InAppBrowser.open;

    return `<a href="#" onclick="window.open( '${match}', '_blank', 'location=yes');">${match}</a>`;
  });
  return target;
}
