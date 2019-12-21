// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + // position of each vertex
  'attribute vec2 a_TexCoord;\n' + // coordinate of texture
  'varying vec2 v_TexCoord;\n' + // value passed to fragment shader
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // not changing vertex positions
  '  v_TexCoord = a_TexCoord;\n' + // how to pass coordinate of texture to frag shader
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' + // average precision
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' + // which texture it uses
  'uniform float u_time;\n' +
  'uniform float u_colorrand1;\n' +
  'uniform float u_colorrand2;\n' +
  'uniform vec2 u_resolution;\n' +
  'varying vec2 v_TexCoord;\n' + // current texture coord passed in from vert shader
  'void main() {\n' +
  'vec2 onePixel = vec2(1.0, 1.0) / u_resolution;\n' +
  'gl_FragColor = (\n' +
  'texture2D(u_Sampler, v_TexCoord) +\n' +
    'texture2D(u_Sampler, v_TexCoord + vec2(onePixel.x*1.*sin(u_time), 0.0)) +\n' +//blur with neighbor 8 steps away to right
    'texture2D(u_Sampler, v_TexCoord + vec2(0.0, onePixel.y*1.*sin(u_time))) +\n' +//blur with neighbor 8 steps away north
    'texture2D(u_Sampler, v_TexCoord + vec2(0.0, -onePixel.y*1.*sin(u_time))) +\n' +//blur with neighbor 8 steps away to south
    'texture2D(u_Sampler, v_TexCoord + vec2(-onePixel.x*1.*sin(u_time), 0.0))) / 5.0;\n' + //blur with neighbor 8 steps away to left

    'vec4 pink = (cos(u_time) + .4)*vec4((255.), (u_colorrand1), (206.), 0.)/100000.;\n' +
    'vec4 blue = (sin(u_time) + .4)*vec4((36.), (u_colorrand2), (255.), 0.)/100000.;\n' +
    'gl_FragColor = gl_FragColor + v_TexCoord.x*pink + 0.6*(1. - v_TexCoord.x)*blue;\n'+ // just a hint of red >:)
  '}\n';

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture
  if (!initTextures(gl, n)) {
    console.log('Failed to intialize the texture.');
    return;
  }
}
// window.onresize = function(){
//   c = document.getElementById("webgl");
//   c.width = window.innerWidth;
//   c.height = window.innerHeight;
//   gl.viewport(0, 0, c.width, c.height );
// }
function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -1.0,  1.0,   0.0, 1.0,
    -1.0, -1.0,   0.0, 0.0,
     1.0,  1.0,   1.0, 1.0,
     1.0, -1.0,   1.0, 0.0,
  ]);
  var n = 4; // The number of vertices

  // Create the buffer object
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object



  // Get the storage location of a_TexCoord
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return -1;
  }
  // Assign the buffer object to a_TexCoord variable
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

  return n;
}

function initTextures(gl, n) {


  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }

  // it is required that we find all uniform locations to use them
  var u_resolution = gl.getUniformLocation(gl.program, 'u_resolution');
  if (!u_resolution) {
      console.log('Failed to get the storage location of u_Sampler');
      return false;
  } 


  

  var image = new Image();  // Create the image object

  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // commented this stuff out as I don't need to load an image
      // Register the event handler to be called on loading an image
      image.onload = function(){ loadTexture(gl, n, u_Sampler, u_resolution, image); };
      // Tell the browser to load an image
      image.src = '../resources/lightblueflower.jpg';
  //colorTexture(gl, n, texture, u_Sampler);
  return true;
}

function loadTexture(gl, n, u_Sampler, u_resolution, image) {

  var texture1 = gl.createTexture();   // Create a texture object for storing the image


  if (!texture1) {
    console.log('Failed to create the texture object');
    return false;
  }

  // first time initialization of texture containing just an image
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
      // Enable texture unit0
      gl.activeTexture(gl.TEXTURE0);
      // Bind the texture object to the target
      gl.bindTexture(gl.TEXTURE_2D, texture1);

      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // Set the texture image
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      
      // Set the texture unit 0 to the sampler
      gl.uniform1i(u_Sampler, 0);
      gl.uniform2f(u_resolution, canvas.width, canvas.height);

      
      gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
      gl.bindTexture(gl.TEXTURE_2D, null); // for cleanliness


  // this texture shall soon contain a canvas sized image
  texture2 = createEmptyTexture(gl, 256, 256);
  if (!texture2) {
    console.log('Failed to create the texture2 object');
    return false;
  }
  // framebuffers are required to allow rendering to textures
  // now to make a texture as big as the canvas with the 256x256 texture drawn on it
  fb1 = createFramebuffer_AttachTexture(gl, texture1); // gonna make a framebuffer for texture holding image for later
  fb2 = createFramebuffer_AttachTexture(gl, texture2); //attach to a framebuffer (container for things like this but also depth testing)
  renderToTexture(gl, fb2, 256, 256);
  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle

  renderTextureToCanvas(gl, texture2, 1, u_Sampler, n);
  // gl.deleteFramebuffer(fb); // for cleanliness why have this around // irrelevant

  gl.useProgram(gl.program);
  // ill save this outside the interval cause... p e r f o r m a n c e
  startTime = new Date();
  var u_time = gl.getUniformLocation(gl.program, 'u_time');
  if (!u_time) {
      console.log('Failed to get the storage location of u_time');
      return false;
  } 

  // get random color stuff
  var u_colorrand1 = gl.getUniformLocation(gl.program, 'u_colorrand1');
  var u_colorrand2 = gl.getUniformLocation(gl.program, 'u_colorrand2');
  if (!u_colorrand1 || !u_colorrand2) {
      console.log("Failed to get the storage location of u_colorrand1/2");
      return false;
  }
  setInterval(function(){ // will call this function every 100 ms
    endTime = new Date();
    var timeDiff = endTime - startTime;
    // gl.uniform1f(u_time, canvas.width, canvas.height);
    //ping
    gl.uniform1f(u_time, timeDiff);
    renderToTexture(gl, fb1, 256, 256);
    gl.bindTexture(gl.TEXTURE_2D, texture2); // it SO vital that this be here cuz... otherwise webgl is like wtf bruh which one
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle

    // random color stuff
    gl.uniform1f(u_colorrand1, Math.random() * 256);
    gl.uniform1f(u_colorrand2, Math.random() * 256);

    renderTextureToCanvas(gl, texture1, 0, u_Sampler, n);

    //pong
    
    renderToTexture(gl, fb2, 256, 256);
    gl.bindTexture(gl.TEXTURE_2D, texture1); // it SO vital...
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
    renderTextureToCanvas(gl, texture2, 1, u_Sampler, n);

    
    
  }, 50)

  
}

function renderTextureToCanvas(gl, texture, index, u_Sampler, n){
  renderToTexture(gl, null, canvas.width, canvas.height); // switch back to canvas
  if (index === 0)
    gl.activeTexture(gl.TEXTURE0);
  else if (index === 1)
    gl.activeTexture(gl.TEXTURE1);
  else if (index === 2)
    gl.activeTexture(gl.TEXTURE2);
  else
    console.log("error bad index");


  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.uniform1i(u_Sampler, index);
  gl.clearColor(1.0, 0.0, 1.0, 1.0); // choose magenta
  gl.clear(gl.COLOR_BUFFER_BIT); // Color everything in canvas that color

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}





createEmptyTexture = function(gl, width, height){
  // create to render to

const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);

{
// define size and format of level 0
const level = 0;
const internalFormat = gl.RGBA;
const targetTextureWidth = width; //not sure dimension significance
const targetTextureHeight = height;
const border = 0;
const format = gl.RGBA; //can format be float :b sigh v.v prob not
const type = gl.UNSIGNED_BYTE;
const data = null;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
              targetTextureWidth, targetTextureHeight, border,
              format, type, data);

//   set the filtering so we don't need mips
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

  return targetTexture;
}

createDataTexture_2C = function(gl, width, height, iData){
  // create to render to

const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);

{
// define size and format of level 0
const level = 0;
const internalFormat = gl.LUMINANCE_ALPHA;
const targetTextureWidth = width; //not sure dimension significance
const targetTextureHeight = height;
const border = 0;
const format = gl.LUMINANCE_ALPHA; //can format be float :b sigh v.v prob not
const type = gl.UNSIGNED_BYTE;     // uwu
const data = iData;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
              targetTextureWidth, targetTextureHeight, border,
              format, type, data);

//   set the filtering so we don't need mips
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

  // prevent weird shif from happening
  const alignment = 1;
  gl.pixelstore(gl.UNPACK_ALIGNMENT, alignment);

  return targetTexture;
}

createBasicTexture = function(gl){
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  {
    // fill texture with 3x2 pixels
    const level = 0;
    const internalFormat = gl.LUMINANCE;
    const width = 2;
    const height = 2;
    const border = 0;
    const format = gl.LUMINANCE;
    const type = gl.UNSIGNED_BYTE;
    const data = new Uint8Array([
      128,  64, 128,
        0,
    ]);
    const alignment = 1;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border,
                  format, type, data);

    // set the filtering so we don't need mips and it's not filtered
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  return texture;
}

createFramebuffer_AttachTexture = function(gl, texture){
// Create and bind the framebuffer
const fb = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

// attach the texture as the first color attachment
const attachmentPoint = gl.COLOR_ATTACHMENT0;
const level = 0;
gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, texture, level);

return fb;
}

renderToTexture = function(gl, framebuffer, width, height){
  gl.viewport(0, 0, width, height );
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
}
