
# Proof-of-Concept: Lazy-Load Features Into InVision Share Link

by [Ben Nadel][bennadel]

This is just an experiment to see if I can use the `.loadNewModules()` method
within AngularJS 1.6.7 in order to lazy-load / inject a new feature into an
[InVision][invision] Share-link experience. This could _theoretically_ allow
for community-driven projects to augment the Share behaviors.

Here's a **bookmarklet** that can be used to inject the experiment. All it does
is use the `jQuery.getScript()` method to load the [`feature.js`](./blob/master/feature.js)
file in this repository:

```js
javascript:(function(w,$,k){(w[k]||(w[k]=$.getScript("https://bennadel.github.io/poc-invision-share-lazy-load/feature.js")));})(window,jQuery,"LazyLoadPOC");void(0);
```

Funzies!


[bennadel]: https://www.bennadel.com/

[invision]: https://www.invisionapp.com/?source=bennadel.com "InVision is the digital product design platform used to make the world's best customer experiences."
