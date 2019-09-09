// @depends PxLoader.js
/**
 * PxLoader plugin to load images
 */

function PxLoaderImage(url, tags, priority) {
    var self = this,
        loader = null;

    this.img = new Image();
    this.tags = tags;
    this.priority = priority;

    var onReadyStateChange = function() {
        if (self.img.readyState == 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };function PxLoaderImage(a,b,c){var d=this,e=null;this.img=new Image;this.tags=b;this.priority=c;var f=function(){if(d.img.readyState=="complete"){i();e.onLoad(d)}};var g=function(){i();e.onLoad(d)};var h=function(){i();e.onError(d)};var i=function(){d.unbind("load",g);d.unbind("readystatechange",f);d.unbind("error",h)};this.start=function(b){e=b;d.bind("load",g);d.bind("readystatechange",f);d.bind("error",h);d.img.src=a};this.checkStatus=function(){if(d.img.complete){i();e.onLoad(d)}};this.onTimeout=function(){i();if(d.img.complete){e.onLoad(d)}else{e.onTimeout(d)}};this.getName=function(){return a};this.bind=function(a,b){if(d.img.addEventListener){d.img.addEventListener(a,b,false)}else if(d.img.attachEvent){d.img.attachEvent("on"+a,b)}};this.unbind=function(a,b){if(d.img.removeEventListener){d.img.removeEventListener(a,b,false)}else if(d.img.detachEvent){d.img.detachEvent("on"+a,b)}}}PxLoader.prototype.addImage=function(a,b,c){var d=new PxLoaderImage(a,b,c);this.add(d);return d.img}

    var onLoad = function() {
        removeEventHandlers();
        loader.onLoad(self);
    };

    var onError = function() {
        removeEventHandlers();
        loader.onError(self);
    };

    var removeEventHandlers = function() {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function(pxLoader) {
        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

        // NOTE: Must add event listeners before the src is set. We
        // also need to use the readystatechange because sometimes
        // load doesn't fire when an image is in the cache.
        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);

        self.img.src = url;
    };

    // called by PxLoader to check status of image (fallback in case
    // the event listeners are not triggered).
    this.checkStatus = function() {
        if (self.img.complete) {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function() {
        removeEventHandlers();
        if (self.img.complete) {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function() {
        return url;
    };

    // cross-browser event binding
    this.bind = function(eventName, eventHandler) {
        if (self.img.addEventListener) {
            self.img.addEventListener(eventName, eventHandler, false);
        } else if (self.img.attachEvent) {
            self.img.attachEvent('on' + eventName, eventHandler);
        }
    };

    // cross-browser event un-binding
    this.unbind = function(eventName, eventHandler) {
        if (self.img.removeEventListener) {
            self.img.removeEventListener(eventName, eventHandler, false);
        } else if (self.img.detachEvent) {
            self.img.detachEvent('on' + eventName, eventHandler);
        }
    };

}

// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addImage = function(url, tags, priority) {
    var imageLoader = new PxLoaderImage(url, tags, priority);
    this.add(imageLoader);
    // return the img element to the caller
    return imageLoader.img;
};