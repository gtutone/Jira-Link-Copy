const lithJira = 'https://gtutone-test.atlassian.net/browse/';

chrome.commands.onCommand.addListener(function(command)
{
	jiraCopier()
});

async function jiraCopier()
{
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	let tabURL = tab.url;

	if (tabURL.startsWith(lithJira))
	{
		// Get the bug number
		let bugNum = tabURL.substr(lithJira.length);

		// Make the bug number a link
		const bugNumLink = "<" + tabURL + "|[" + bugNum + "]> - ";

		// Get the Issue Summary
		const issueSummary = tab.title.slice(0,-7).replace(/\[.+?\]\s/, '');

		// Put the pastable text together
		const pastableText = '<a href="' + tabURL +  '">' + bugNum + "</a> - " + issueSummary
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
};