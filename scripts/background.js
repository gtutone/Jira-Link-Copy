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
		console.log(currentURL);
		console.log("Yes this is a Jira URL");
		
		// Get the bug number
		let bugNum = currentURL.substr(lithJira.length);
		console.log(bugNum);

		// Put it all together







	} else 
	{
		console.log("This is not a Jira URL");
	}
});