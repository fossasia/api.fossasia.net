var ffapi = {};
ffapi.formTemplate = 
[
	"name",
	"url",{
		"type": "fieldset",
		"title": "Location",
		"expanded": true,
		"items": [
			"location.city",{
				"key": "location.country"
			},
			"location.lat",
			"location.lon"
		]
	}, {
		"type": "fieldset",
		"expanded": true,
		"title": "Contact",
		"items": [
			"contact.email",
			"contact.phone"
		]
	}, {
		"type": "button",
		"onClick": function (evt) {
			evt.preventDefault();
			var r = confirm('Do you really want to only submit this simple version?\n\nThe advanced fields are used in several apps, i.e. to aggregate feeds or calendars, show more information on the comunity map, gather statistics data, creating timelines (to be continued). So if you have more pieces of information, please provide them with your API file');
			if (r === true) {
				$('form').submit();
			}
		},
		"title": "OK - generate that simple API file!"
	}, {
		"type": "help",
		"helpvalue": "<br/><div>The previous fields only contain a <strong>very reduced set</strong> of possible data fields. If you already know some details please take a look on the fields below to complete your file.</div><br/>"
	}, {
		"type": "fieldset",
		"title": "Advanced fields...",
		// "expandable": true,
		"items": [
			"metacommunity",
			"state.logo",
			{
				"type": "fieldset",
				"title": "Advanced Contacts",
				"expandable": true,
				"items": [
					"contact.jabber",
					"contact.irc",
					"contact.ml",
					"contact.identica",
					"contact.facebook",
					"contact.twitter",
					"contact.googleplus"
				]
			}, {
				"type": "fieldset",
				"title": "Location Details",
				"expandable": true,
				"items": [
					"location.address"
				]
			}, {
				"type": "fieldset",
				"title": "Timeline",
				"expandable": true,
				"items": "timeline",
				"onInsert": function (evt, node) {
					$('a', node.el).click(function () {
						// alert('Ni!');

						setTimeout(function () {
							addDatepickerToTimeline();
						}, 500);

					});
				},
				"onChange": function (evt, node) {
					$('a', node.el).click(function () {
						// alert('Ni!');

						setTimeout(function () {
							addDatepickerToTimeline();
						}, 500);

					});
				}
			}, {
				"type": "fieldset",
				"title": "Feeds",
				"expandable": true,
				"items": "feeds"
			}, {
				"key": "state.lastchange",
				"type": "hidden"
			}, {
				"key": "api",
				"type": "hidden"
			}
		]
	}, {
		"type": "submit",
		"title": "OK - generate the full API file!"
	}
];

