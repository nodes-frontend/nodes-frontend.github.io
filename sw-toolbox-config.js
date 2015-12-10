(function(global) {
	"use strict";

	global.toolbox.router.get('/content/(.*)', global.toolbox.networkFirst);

	var MISSING_IMAGE = '/assets/img/fallback.png';
	global.toolbox.precache(MISSING_IMAGE);

	function imageHandler(request, values, options) {
		return global.toolbox.cacheFirst(request, values, options)
			.catch(function() {
				return global.caches.match(MISSING_IMAGE);
			});
	}

	//https://octodex.github.com/images/stormtroopocat.jpg
	global.toolbox.router.get('/(.*)', imageHandler, {
		cache: {
			name: 'image-cache',
			maxEntries: 50
		},
		origin: /octodex.github.com$/
	});

})(self);