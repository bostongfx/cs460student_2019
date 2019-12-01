/**
 * Inspired from https://stackoverflow.com/a/36046727
 *
 * Modified to work directly with Float32Arrays and to match
 * the Python API.
 * 
 */
var base64 = {};

base64.b64encode = function (array) {

    array = new Uint8Array(array.buffer);

    return btoa(String.fromCharCode.apply(null, array));

};

base64.b64decode = function (str) {
    
    array = atob(str).split('').map(function (c) { return c.charCodeAt(0); });

    return new Float32Array(new Uint8Array(array).buffer);

};
