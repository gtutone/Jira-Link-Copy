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
		const bugNumLink = "<" + currentURL + "|[" + bugNum + "]>"
		console.log(bugNumLink);

		// Get the Issue Summary
		// const regex = '\[.+?\]\s';
		const issueSummary = tab.title.slice(0,-7).replace(\[.+?\]\s, '');
		console.log(issueSummary);

	} else 
	{
		console.log("This is not a Jira Bug");
	}
});