/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';



/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["app/common/utils/blog-helpers/BlogHelpers.module.js","76a344bcd481fd02f2b059f41162fa10"],["app/common/utils/blog-helpers/BlogHelpers.service.js","fb138471bcf5c6696ffa7b957ba87117"],["app/common/utils/page-helpers/PageHelpers.module.js","aef59c45707b768fbbab94ff75b7f90e"],["app/common/utils/page-helpers/PageHelpers.service.js","56c2df653d622b95833626d9143d349c"],["app/config/api.constant.js","f9c4d22eaba858b038a84779d91f97b2"],["app/config/api.module.js","a64e6a990b225f308ed8fcf7f10b6720"],["app/config/app.js","10646d66cba646207d98004498bc8af6"],["app/config/config.js","00c4a4ec1525f4fb2205f038a12d8fff"],["app/config/run.js","6bb28aaf8944eb71b04dd65aed9a0f50"],["app/models/page/Page.factory.js","f0db919eac18711e7c7bbda06f3d97eb"],["app/models/page/Pages.module.js","3bc230c469cea219c2c06e53a552c507"],["app/models/page/Pages.service.js","ce9ffdf9b69fcd5c87b211d48bbf3e36"],["app/models/post/Post.factory.js","a3e6e846b55fb018393cbfff179c4c16"],["app/models/post/Posts.module.js","d4916c04bdbafa942946378e3c77cabc"],["app/models/post/Posts.service.js","860e091b3dbcb68369b0ea31de4cc4f1"],["app/models/site/Site.module.js","499acc88cdc4053cdd4e80e9d0196d59"],["app/models/site/Site.service.js","ad63d64ff66adaa35c9dd16830a72b1f"],["app/modules/404/404.controller.js","94c75ed87794e85f37257d88cfaa743a"],["app/modules/404/404.module.js","b7aaba4be35e7fe61f55436120dbea6d"],["app/modules/404/404.route.js","3221ab80e1a3e4935367a16158dc5fef"],["app/modules/404/404.template.html","77ad034aee94eeb925888489526e41cc"],["app/modules/application/application.controller.js","9bef7e577f310809587cf0c59a698cee"],["app/modules/application/application.module.js","b6b91788bd5573bfee35d3b65d337168"],["app/modules/application/application.route.js","b7a082822c872159f328b6dfab9fb00a"],["app/modules/application/application.template.html","38386deea43db8ff3725ce30e16a04af"],["app/modules/blog/blog.controller.js","2d1888be844a4b4c1172a738508684e7"],["app/modules/blog/blog.module.js","fd882fdbbc246c5cff8d677a4d08ac06"],["app/modules/blog/blog.route.js","85f130280326b03c6a7922fa9cb72443"],["app/modules/blog/blog.template.html","7c51911bc61fc794af09fe38553205fa"],["app/modules/blog/single/blog-single.controller.js","b1fc2286df876d9b6c515f3e4bc67458"],["app/modules/blog/single/blog-single.template.html","606ab841f323106aa518749fcc0a2994"],["app/modules/index/index.controller.js","03861f49667b94c268c6a39f6b5d3590"],["app/modules/index/index.module.js","939cecc6fb269349192edb044f2cbf2d"],["app/modules/index/index.route.js","3a58e7bcbb9db92cc53eb30601427976"],["app/modules/index/index.template.html","cbb49c979ff4136c177a0793ed824dc7"],["app/modules/page/page.controller.js","001c008b7717e35eb2fdeb34f9c71e8b"],["app/modules/page/page.module.js","edc66aa3d2be58df76e8a88578e630c4"],["app/modules/page/page.route.js","2c079fd61cba11b5538d523f8a1d9c04"],["app/modules/page/page.template.html","6521fc1ac0a7f34a7d87aa8758b03032"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-nodes-frontend-' + (self.registration ? self.registration.scope : '') + '-';




var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var populateCurrentCacheNames = function (precacheConfig, cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl, ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var url = new URL(CurrentCacheNamesToAbsoluteUrl[cacheName]);
          // Put in a cache-busting parameter to ensure we're caching a fresh response.
          if (url.search) {
            url.search += '&';
          }
          url.search += 'sw-precache=' + now;
          var urlWithCacheBusting = url.toString();

          console.log('Adding URL "%s" to cache named "%s"', urlWithCacheBusting, cacheName);
          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request.clone()).then(function(response) {
              if (response.ok) {
                return cache.put(request, response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            console.log('Deleting out-of-date cache "%s"', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


