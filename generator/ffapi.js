$.getJSON("config.json", function(config) {

	var handleSchema = function()
	{
		var currentSchema;

		// --

		$( '.autohide' ).hide();

		// ---
		
		var sanitizeOldVersions = function(schema) {
			var message = "Due to updates in our specs, some fields changed and aren't backwards compatible. Please update the following details:\n";
			var counter = 0;

	    // if schema updates aren't backwards compatible you can try to correct it right here...
			
			if (counter > 0) {
				alert(message);
			}
			return schema;
		};
		
		// ---

		var takeJson =
			function() {
				$( '.autohide' ).hide();
				var json = $( '#jsonText' ).val();
				try {
					currentSchema.value = JSON.parse( json );
					currentSchema.value = sanitizeOldVersions(currentSchema.value);
					$('#schemaform').empty().jsonForm( currentSchema );
				}
				catch ( e ) {
					console.error( "JSON Syntax Error" );
	                return;
				}
	            addMapPickerToLocation();
			};

		// ---

		$( '#jsonTakeButton').bind( 'click', takeJson );

		// ---

		var sortObject = function(map) {
			var keys = _.sortBy(_.keys(map), function(a) { return a; });
			var newmap = {};
			_.each(keys, function(k) {
				newmap[k] = map[k];
			});
			return newmap;
		}

		// ---

		var dirSelect = 
			function() {
				$( '#dirselect' ).append($('<option>').text('choose a community from list'));
				var protocol = window.location.origin.split(':')[0] + ':';
				var proxy = "php-simple-proxy/ba-simple-proxy.php?url=";
				var directoryUrl = "//rawgit.com/fossasia/directory.api.fossasia.net/master/directory.json";
				var url = proxy + protocol + directoryUrl;
				$.getJSON(url, function(dir) {
					if (dir.contents) {
						dir.contents = sortObject(dir.contents);
						$.each( dir.contents, function (key, val) {
							$( '#dirselect' )
							.append($('<option>', { value : val })
								.text(key));
						});
					} else {
						console.error("Could not load community directory: ", url);
					}
				}); 
			};

		// ---

		$( '#dirselect' ).on('change', function() {
			$.getJSON( "php-simple-proxy/ba-simple-proxy.php?url=" + encodeURIComponent(this.value), function(communityJson) {
				$( '#jsonText' )
				.empty()
				.val(JSON.stringify( communityJson.contents, null, '  '));
			validate();
			});
		});

		// ---

		var showError = function(errors) {
			var errorText = 'Unfortunately there are ' + errors.length + ' errors in your file validated against our API version ' + config.apiVersion + ': <ul>';
			$.each( errors, function(key, val) {
				var path = val.uri.match(/.*#\/(.*$)/);
				if (RegExp.$1 == "api") { 
					errorText += '<li>' + RegExp.$1 + ' (don\'t care about, we\'ll update it on submit)</li>'; 
				} else {
					errorText += '<li>' + RegExp.$1 + '</li>';
				}
			});
			errorText += '</ul> Please review the fields on the left side and submit your file again!';
			$( '#error' ).show();
			$( '#downloadButton' ).attr('disabled', 'disabled');
			$( '#downloadButton' ).attr('title', 'You need a valid JSON to download your file');
			$( '#downloadButton' ).attr('class', 'btn btn-danger');
			$( '#validateButton' ).attr('title', 'There are serious errors within your API file, please correct your file and submit again!');
			$( '#error .message' ).show().html( errorText);
			$( 'body' ).scrollTop( 0 );
		};

		// ---

		var validate = 
			function() {
				takeJson();
				//var JSV = require("./JSV").JSV;
				var env = JSV.createEnvironment();
				var schema = currentSchema.schema;
				var report = env.validate(currentSchema.value, schema);
				if ( currentSchema.value.name ) {
					$( '#communityName' ).val(currentSchema.value.name.replace(/\s/g, ''));
					addDatepickerToTimeline();
				}
				if (report.errors.length === 0) {
					$( '#downloadButton' ).removeAttr('disabled');
					$( '#downloadButton' ).attr('title', 'Download the JSON contents');
					$( '#downloadButton' ).attr('class', 'btn btn-success');
					$( '#validateButton' ).attr('title', 'Your file is clean and ready to be deployed');
					$( '#result .message' ).show().text( 'Congrats! Your API file is valid to version ' + config.apiVersion + ' of our specs.' );
					$( 'body' ).scrollTop( 0 );
				} else if (report.errors.length === 1 && report.errors[0].schemaUri.match(/properties\/api$/)) {
					$( '#result .message' ).show().text( 'Congrats! Your API file is valid to version ' + config.apiVersion + ' of our specs. We just updated the version and the date of change.' );
					var date = new Date();
					currentSchema.value.api = config.apiVersion;
					currentSchema.value.state.lastchange = date.toISOString(); 
					$( '#downloadButton' ).removeAttr('disabled');
					$( '#downloadButton' ).attr('title', 'Download the JSON contents');
					$( '#validateButton' ).attr('title', 'There are little problems, but your API file is valid');
					$( '#downloadButton' ).attr('class', 'btn btn-warning');
					$( '#jsonText' ).val( JSON.stringify( currentSchema.value, null, '  ' ) );
					$( 'body' ).scrollTop( 0 );
				} else {
					showError(report.errors);
				}
			};

		// ---

		$( '#validateButton').bind( 'click', validate);

		// ---

		var download =
			function() {
				window.location = "data:application/text,"+ $( '#jsonText' ).val();
			};

		//$( '#downloadButton').bind( 'click', download);

		// ---

		var handleSubmit =
			function (errors, values) {
				$( '.autohide' ).hide();
				if ( values.name ) {
					$( '#communityName' ).val(values.name.replace(/\s/g, ''));
				}
				if (! errors ||(errors.length === 1 && errors[0].schemaUri.match(/properties\/api$/))) {
					$( '#downloadButton' ).removeAttr('disabled');
					$( '#downloadButton' ).attr('title', 'Download the JSON contents');
					$( '#downloadButton' ).attr('class', 'btn btn-success');
					$( '#validateButton' ).attr('title', 'Your file is clean and ready to be deployed');
					$( '#result .message' ).show().text( 'Hello ' + values.name + '. This is your API file. Place it on a public webserver and add the URL to our directory.' );
					var date = new Date();
					values.api = config.apiVersion;
					values.state.lastchange = date.toISOString(); 
					$( '#jsonText' ).val( JSON.stringify( values, null, '  ' ) );
					$( 'body' ).scrollTop( 0 );
				}
				else {
					showError(errors);
				}
			};

		// finally return the "handleSchema"-function-body
		return function ( schema ) {;
			schema.form = ffapi.formTemplate;
			schema.form[2].items[1].titleMap = ffapi.isoCountryCodes;
			schema.onSubmit = handleSubmit;

			directory = dirSelect();

			$('#schemaform').jsonForm( schema );

			currentSchema = schema;
			addDatepickerToTimeline();

	        addMapPickerToLocation();
		};
	}();

	$.getJSON( config.apiVersion + ".json", handleSchema );

	function addDatepickerToTimeline() {
		var i = 0;
		while(i < 999) {
			var $input = $('[name="timeline['+i+'].timestamp"]');
			if ($input.length > 0 ) {
				$input.datepicker({
					showOn: "button",
					buttonImage: "icon_calendar.svg",
					buttonImageOnly: true,
					dateFormat: 'yy-mm-dd'
				});
				$input.change( function() {
					$(this).val().toISOString;
				});
			} else {
				break;
			}
			i++;
		}
	}

	function addMapPickerToLocation() {
	    var latInput = $('input[name="location.lat"]');
	    var lngInput = $('input[name="location.lon"]');

	    $(("<div id=\"map\" class=\"span6\"></div>")).insertAfter(lngInput.parent(".controls"));

	    var map = L.map('map');

	    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	        maxZoom: 18,
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	        id: 'examples.map-i875mjb7',
	        noWrap : true
	    }).addTo(map);

	    var updateMarker = function() {
	        marker
	            .setLatLng([latInput.val(), lngInput.val()])
	            .bindPopup("Your location :  " + marker.getLatLng().toString())
	            .openPopup();
	        return false;
	    };

	    // set zoom center and marker position
	    var marker = L.marker(config.defaultMapCenter).addTo(map);
	    if (!latInput.val() || !lngInput.val()) {
	        map.setView(config.defaultMapCenter, 3);
	    } else {
	        map.setView([latInput.val(), lngInput.val()], 3);
	        updateMarker();
	    }

	    latInput.on('input', updateMarker);
	    lngInput.on('input', updateMarker);

	    // add on map click event
	    map.on('click', function(e) {
	        latInput.val(e.latlng.lat);
	        lngInput.val(e.latlng.lng);
	        updateMarker();
	    });

	}
});
