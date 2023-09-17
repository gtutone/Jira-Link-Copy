const lithJira = 'https://lithjira.wbiegames.com:8443/browse/';

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
		const issueSummary = tab.title.slice(0,-11).replace(/\[.+?\]\s/, '');

		// Put the pastable text together
		const pastableText = '<a href="' + currentURL + '">' + bugNum + "</a> - " + issueSummary
		console.log(pastableText);

		copyFormatted (pastableText);

	} else 
	{
		console.log("This is not a Jira Bug");
	}
});

// This function expects an HTML string and copies it as rich text.
function copyFormatted (html)
{
	// Create container for the HTML
	var container = document.createElement('div')
	container.innerHTML = html

	// Hide element
	container.style.position = 'fixed'
	container.style.pointerEvents = 'none'
	container.style.opacity = 0

	// Detect all style sheets of the page
	var activeSheets = Array.prototype.slice.call(document.styleSheets)
	.filter(function (sheet)
	{
		return !sheet.disabled
	})

	// Mount the container to the DOM to make `contentWindow` available
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

	// Remove the container
	document.body.removeChild(container)
};