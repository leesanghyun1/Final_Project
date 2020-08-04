var events = [
	      {'Date': new Date(2019, 4, 7), 'Title 1': 'Doctor appointment at 3:25pm.'},
	      {'Date': new Date(2019, 4, 18), 'Title 2': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
	      {'Date': new Date(2019, 4, 27), 'Title 3': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
