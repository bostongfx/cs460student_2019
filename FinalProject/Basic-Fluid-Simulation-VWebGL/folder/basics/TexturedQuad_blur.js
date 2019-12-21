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
  'uniform vec2 u_resolution;\n' +
  'varying vec2 v_TexCoord;\n' + // current texture coord passed in from vert shader
  'void main() {\n' +
  'vec2 onePixel = vec2(1.0, 1.0) / u_resolution;\n' +
  'gl_FragColor = (\n' +
'texture2D(u_Sampler, v_TexCoord) +\n' +
    'texture2D(u_Sampler, v_TexCoord + vec2(onePixel.x*10., 0.0)) +\n' +
    'texture2D(u_Sampler, v_TexCoord + vec2(-onePixel.x*10., 0.0))) / 3.0;\n' +
  // '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' + // make current pixel color the corresponding texel color in texture (texel is texture pixel)
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
window.onresize = function(){
  c = document.getElementById("webgl");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  gl.viewport(0, 0, c.width, c.height );
}
function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -0.5,  0.5,   0.0, 1.0,
    -0.5, -0.5,   0.0, 0.0,
     0.5,  0.5,   1.0, 1.0,
     0.5, -0.5,   1.0, 0.0,
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
  var texture = gl.createTexture();   // Create a texture object

  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }



  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }


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
      image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, u_resolution, image); };
      // Tell the browser to load an image
      image.src = '../resources/sky.jpg';
  //colorTexture(gl, n, texture, u_Sampler);
  return true;
}

function loadTexture(gl, n, texture, u_Sampler, u_resolution, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 0);
  gl.uniform2f(u_resolution, canvas.width, canvas.height);
  
  gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function colorTexture(gl, n, texture, u_Sampler){

  texture = createEmptyTexture(gl, 1, 1); //create texture which is 1 by 1 pixels (could be bigger)
  fb = createFramebuffer_AttachTexture(gl, texture); //attach to a framebuffer (container for things like this but also depth testing)
  renderToTexture(gl, fb); // render to the framebuffer containing texture which means whatever we render will be stored in texture

  gl.clearColor(1.0, 1.0, 0.0, 1.0); // choose yellow
  gl.clear(gl.COLOR_BUFFER_BIT); //color everything in the texture that color




  renderToTexture(gl, null); // switch back to canvas

  gl.activeTexture(gl.TEXTURE0); //activate the first attached texture (just for explicitness since it matters if have multiple textures)


  gl.bindTexture(gl.TEXTURE_2D, texture); // doesn't matter but may be important if multiple textures just in case
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // just in case minmapping wasn't set (but it was in prev functions)


  // you set variables in glsl 
  gl.uniform1i(u_Sampler, 0); // must be set to match active texture, i.e. if gl.TEXTURE1 then set it to 1


  gl.clearColor(1.0, 0.0, 1.0, 1.0); // choose magenta
  gl.clear(gl.COLOR_BUFFER_BIT); // Color everything in canvas that color

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // draw on the canvas according to initialized geometry, shader, and texture
  gl.bindTexture(gl.TEXTURE_2D, null);
  //since canvas ends up with a yellow square in the middle, we must conclude webgl successfully rendered my texture
}




createEmptyTexture = function(gl, height, width){
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
gl.bindTexture(gl.TEXTURE_2D, null);
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
  gl.bindTexture(gl.TEXTURE_2D, null);
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

renderToTexture = function(gl, framebuffer){
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
}