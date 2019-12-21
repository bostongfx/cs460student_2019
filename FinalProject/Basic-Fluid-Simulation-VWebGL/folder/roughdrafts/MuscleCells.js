// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
// var VSHADER_SOURCE =
//   'attribute vec4 a_Position;\n' + // position of each vertex
//   'attribute vec2 a_TexCoord;\n' + // coordinate of texture
//   'varying vec2 v_TexCoord;\n' + // value passed to fragment shader
//   'void main() {\n' +
//   '  gl_Position = a_Position;\n' + // not changing vertex positions
//   '  v_TexCoord = a_TexCoord;\n' + // how to pass coordinate of texture to frag shader
//   '}\n';

// // Fragment shader program
// var FSHADER_SOURCE =
//   '#ifdef GL_ES\n' +
//   'precision mediump float;\n' + // average precision
//   '#endif\n' +
//   '#define PI 3.1415926538\n' + 
//   'uniform sampler2D u_data;\n' + 
//   // 'uniform vec2 u_resolution;\n' +
//   'varying vec2 v_TexCoord;\n' + // current texture coord passed in from vert shader
//   'void main() {\n' +

//   'float angle = texture2D(u_data, v_TexCoord).r * 2. * PI;\n' +
//   'float magnitude = texture2D(u_data, v_TexCoord).a * 10.;\n' +
//   'float velocity_x = magnitude * cos(angle); \n' +
//   'float velocity_y = magnitude * sin(angle); \n' +

//   'gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1); \n' +
    
//   '}\n';
function main() {

  var oReq = new XMLHttpRequest();
  oReq.open("GET", "v_texture.txt", false);
  oReq.send();
  VSHADER_SOURCE = oReq.responseText;

  var oReq = new XMLHttpRequest();
  oReq.open("GET", "f_texture.txt", false);
  oReq.send();
  FSHADER_SOURCE = oReq.responseText;
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
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'texture')) {
    console.log('Failed to intialize shaders.');
    return;
  }



  var oReq = new XMLHttpRequest();
  oReq.open("GET", "v_advect.txt", false);
  oReq.send();
  VSHADER_SOURCE = oReq.responseText;

  var oReq = new XMLHttpRequest();
  oReq.open("GET", "f_advect.txt", false);
  oReq.send();
  FSHADER_SOURCE = oReq.responseText;
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Get the rendering context for WebGL


  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'advect')) {
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


  var u_data = gl.getUniformLocation(gl.program, 'u_data');
  if (!u_data){
    console.log('Failed to get the storage location of u_data');
    return false;
  }
  var u_velocity = gl.getUniformLocation(gl.program, 'u_velocity');
  if (!u_data){
    console.log('Failed to get the storage location of u_velocity');
    return false;
  }
  var u_deltaTime = gl.getUniformLocation(gl.program, 'u_deltaTime');
  if (!u_deltaTime){
    console.log('Failed to get the storage location of u_deltaTime');
    return false;
  }

  
  colorTexture(gl, n, u_data, u_deltaTime, u_velocity);
  return true;
}

function colorTexture(gl, n, u_data, u_deltaTime, u_velocity){

  


  row = function(a1, a2, a3, a4, b1, b2, b3, b4){
    // var a = new Uint8Array(16*2);
    return new Uint8Array([
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,

      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,

      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,
      a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4, a1, a2, a3, a4,

      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4,
      
    ]);
  }

  var u = new Uint8Array(0);
  for (i = 0; i < 64; i++){
      var v = row(255, 50, 100, 255, 255, 150, 200, 255);
      var w = new Uint8Array(u.length + v.length);
      w.set(u);
      w.set(v, u.length);
      u = w;
  }
  for (i = 0; i < 64; i++){
    var v = row(0, 0, 0, 255, 50, 20, 20, 255);
    var w = new Uint8Array(u.length + v.length);
    w.set(u);
    w.set(v, u.length);
    u = w;
}
for (i = 0; i < 64; i++){
  var v = row(255, 50, 100, 255, 255, 150, 200, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
for (i = 0; i < 64; i++){
  var v = row(0, 0, 0, 255, 50, 20, 20, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
  arr = u;  
  
  var texture = createDataTexture_4C(gl, 256, 256, arr);


  arr = new Uint8Array(256*256*2);
  for (i = 0; i < arr.length;i++){
    if (i % 2 == 0){
      arr[i] = i; // angle
    }
    else{
      arr[i] = 255; //magnitude
    }
  }

  var velocity_texture = createDataTexture_2C(gl, 256, 256, arr);


  // gl.useProgram(gl.programs['advect']);
  // renderToTexture(gl, null); // switch back to canvas

  gl.activeTexture(gl.TEXTURE0); //activate the first attached texture (just for explicitness since it matters if have multiple textures)


  gl.bindTexture(gl.TEXTURE_2D, texture); // doesn't matter but may be important if multiple textures just in case
  
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // just in case minmapping wasn't set (but it was in prev functions)

  gl.activeTexture(gl.TEXTURE1); //activate the first attached texture (just for explicitness since it matters if have multiple textures)

  gl.bindTexture(gl.TEXTURE_2D, velocity_texture);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // you set variables in glsl 
  gl.uniform1i(u_data, 0); // must be set to match active texture, i.e. if gl.TEXTURE1 then set it to 1
  gl.uniform1i(u_velocity, 1);
  gl.uniform1f(u_deltaTime, 0.03);

  gl.clearColor(1.0, 1.0, 1.0, 1.0); // choose white
  gl.clear(gl.COLOR_BUFFER_BIT); // Color everything in canvas that color

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // draw on the canvas according to initialized geometry, shader, and texture
  // gl.bindTexture(gl.TEXTURE_2D, null);
  //since canvas ends up with a yellow square in the middle, we must conclude webgl successfully rendered my texture

  v = 0;

  setInterval(function(){
    v += 0.002;
    gl.uniform1f(u_deltaTime, v);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  }, 5)




  // var u_data = gl.getUniformLocation(gl.programs['advect'], 'u_data');
  // if (!u_data){
  //   console.log('Failed to get the storage location of u_data');
  //   return false;
  // }
  // var u_texture = gl.getUniformLocation(gl.programs['advect'], 'u_texture');
  // if (!u_texture){
  //   console.log('Failed to get the storage location of u_texture');
  //   return false;
  // }

  // gl.useProgram(gl.programs['advect']);

  // gl.activeTexture(gl.TEXTURE1); //activate the first attached texture (just for explicitness since it matters if have multiple textures)

  // gl.bindTexture(gl.TEXTURE_2D, velocity_texture);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // gl.uniform1i(u_data, 0);
  // gl.uniform1i(u_velocity, 1);

  // gl.clearColor(1.0, 1.0, 1.0, 1.0); // choose white
  // gl.clear(gl.COLOR_BUFFER_BIT); // Color everything in canvas that color

  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // draw on the canvas according to initialized geometry, shader, and texture
  // gl.bindTexture(gl.TEXTURE_2D, null);

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
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}


  // prevent weird shif from happening
  const alignment = 1;
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

  return targetTexture;
}

createDataTexture_3C = function(gl, width, height, iData){
  // create to render to

const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);

{
// define size and format of level 0
const level = 0;
const internalFormat = gl.RGB;
const targetTextureWidth = width; //not sure dimension significance
const targetTextureHeight = height;
const border = 0;
const format = gl.RGB; //can format be float :b sigh v.v prob not
const type = gl.UNSIGNED_BYTE;     // uwu
const data = iData;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
              targetTextureWidth, targetTextureHeight, border,
              format, type, data);

//   set the filtering so we don't need mips
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

  // prevent weird shif from happening
  const alignment = 1;
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

  return targetTexture;
}

createDataTexture_4C = function(gl, width, height, iData){
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
const type = gl.UNSIGNED_BYTE;     // uwu
const data = iData;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
              targetTextureWidth, targetTextureHeight, border,
              format, type, data);

//   set the filtering so we don't need mips
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

  // prevent weird shif from happening
  const alignment = 1;
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

  return targetTexture;
}