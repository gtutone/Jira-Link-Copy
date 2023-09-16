const lithJira = 'https://gtutone-test.atlassian.net/browse/';

chrome.action.onClicked.addListener(async (tab) => 
{
	if (tab.url.startsWith(lithJira))
	{
		// Get the URL
		function getCurrentURL()
		{
			return tab.url
		}
		const currentURL = getCurrentURL();
		
		// Get the bug number
		let bugNum = currentURL.substr(lithJira.length);

		// Make the bug number a link
		const bugNumLink = "<" + currentURL + "|[" + bugNum + "]> - ";

		// Get the Issue Summary
		const issueSummary = tab.title.slice(0,-7).replace(/\[.+?\]\s/, '');

		// Put the pastable text together
		const pastableText = '<a href="' + currentURL +  '">' + bugNum + "</a> - " + issueSummary
		console.log(pastableText);


		// use an offscreen document to write the value of `pastableText` to the system clipboard.
		await addToClipboard(pastableText);

		// Create an offscreen document and pass it the data we want to write to the clipboard.
		async function addToClipboard(value) {
		  await chrome.offscreen.createDocument({
		    url: 'offscreen.html',
		    reasons: [chrome.offscreen.Reason.CLIPBOARD],
		    justification: 'Write text to the clipboard.'
		  });

		  // Now that we have an offscreen document, we can dispatch the
		  // message.
		  chrome.runtime.sendMessage({
		    type: 'copy-data-to-clipboard',
		    target: 'offscreen-doc',
		    data: value
		  });
		}


	} else 
	{
		console.log("This is not a Jira Bug");
	}
});