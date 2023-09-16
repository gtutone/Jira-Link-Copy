// Once the message has been posted from the service worker, checks are made to
// confirm the message type and target before proceeding. This is so that the
// module can easily be adapted into existing workflows where secondary uses for
// the document (or alternate offscreen documents) might be implemented.

// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.
chrome.runtime.onMessage.addListener(handleMessages);

// This function performs basic filtering and error checking on messages before
// dispatching the
// message to a more specific message handler.
async function handleMessages(message) {
  // Return early if this message isn't meant for the offscreen document.
  if (message.target !== 'offscreen-doc') {
    return;
  }

  // Dispatch the message to an appropriate handler.
  switch (message.type) {
    case 'copy-data-to-clipboard':
      handleClipboardWrite(message.data);
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
  }
}

// We use a <textarea> element for two main reasons:
//  1. preserve the formatting of multiline text,
//  2. select the node's content using this element's `.select()` method.
const textEl = document.querySelector('#text');

// Use the offscreen document's `document` interface to write a new value to the
// system clipboard.
//
// At the time this demo was created (Jan 2023) the `navigator.clipboard` API
// requires that the window is focused, but offscreen documents cannot be
// focused. As such, we have to fall back to `document.execCommand()`.
async function handleClipboardWrite(data) {
  try {
    // Error if we received the wrong kind of data.
    if (typeof data !== 'string') {
      throw new TypeError(
        `Value provided must be a 'string', got '${typeof data}'.`
      );
    }

    // `document.execCommand('copy')` works against the user's selection in a web
    // page. As such, we must insert the string we want to copy to the web page
    // and to select that content in the page before calling `execCommand()`.

    // Create an iframe (isolated container) for the HTML
      var container = document.createElement('div')
      container.innerHTML = data
      
      // Hide element
      container.style.position = 'fixed'
      container.style.pointerEvents = 'none'
      container.style.opacity = 0

      // Mount the iframe to the DOM to make `contentWindow` available
      document.body.appendChild(container)

      // Copy to clipboard
      window.getSelection().removeAllRanges()
      
      var range = document.createRange()
      range.selectNode(container)
      window.getSelection().addRange(range)

      document.execCommand('copy')
      for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
      document.execCommand('copy')
      for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false
      
      // Remove the iframe
      document.body.removeChild(container)

  } finally {
    // Job's done! Close the offscreen document.
    window.close();
  }
}
