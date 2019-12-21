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


  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "v_texture.txt", false);
  oReq.send();
  VSHADER_SOURCE = oReq.responseText;

  var oReq = new XMLHttpRequest();
  oReq.open("GET", "f_texture.txt", false);
  oReq.send();
  FSHADER_SOURCE = oReq.responseText;
  // Retrieve <canvas> element

  // Get the rendering context for WebGL


  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'texture')) {
    console.log('Failed to intialize shaders.');
    return;
  }
  }

  {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "advect.vert", false);
    oReq.send();
    VSHADER_SOURCE = oReq.responseText;

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "advect.frag", false);
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
  }

  {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "v_advect_velocity.txt", false);
    oReq.send();
    VSHADER_SOURCE = oReq.responseText;
  
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "f_advect_velocity.txt", false);
    oReq.send();
    FSHADER_SOURCE = oReq.responseText;
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Get the rendering context for WebGL
  
  
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'advect_velocity')) {
      console.log('Failed to intialize shaders.');
      return;
    }
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


  gl.shaders['advect'].uniforms['u_data'] = gl.getUniformLocation(gl.programs['advect'], 'u_data');
  if (!gl.shaders['advect'].uniforms['u_data']){
    console.log('Failed to get the storage location of u_data');
    return false;
  }
  gl.shaders['advect'].uniforms['u_velocity'] = gl.getUniformLocation(gl.programs['advect'], 'u_velocity');
  if (!gl.shaders['advect'].uniforms['u_velocity']){
    console.log('Failed to get the storage location of u_velocity');
    return false;
  }
  gl.shaders['advect'].uniforms['u_deltaTime'] = gl.getUniformLocation(gl.programs['advect'], 'u_deltaTime');
  if (!gl.shaders['advect'].uniforms['u_deltaTime']){
    console.log('Failed to get the storage location of u_deltaTime');
    return false;
  }




  
  colorTexture(gl, n);
  return true;
}

function colorTexture(gl, n){

  
  var side = 512;

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
  arr = new Uint8Array(0);
{
  var u = new Uint8Array(0);
  for (i = 0; i < side / 16; i++){
      var v = row(255, 50, 100, 255, 255, 150, 200, 255);
      var w = new Uint8Array(u.length + v.length);
      w.set(u);
      w.set(v, u.length);
      u = w;
  }
  for (i = 0; i < side / 16; i++){
    var v = row(240, 150, 200, 255, 255, 50, 100, 255);
    var w = new Uint8Array(u.length + v.length);
    w.set(u);
    w.set(v, u.length);
    u = w;
}
for (i = 0; i < side / 16; i++){
  var v = row(225, 75, 125, 255, 255, 175, 225, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
for (i = 0; i < side / 16; i++){
  var v = row(210, 175, 225, 255, 255, 75, 125, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
for (i = 0; i < side / 16; i++){
  var v = row(195, 100, 150, 255, 255, 200, 250, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(180, 200, 250, 255, 255, 100, 150, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(165, 25, 75, 255, 255, 125, 175, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(150, 125, 175, 255, 255, 25, 75, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
  var v = row(135, 0, 50, 255, 255, 100, 150, 255);
  var w = new Uint8Array(u.length + v.length);
  w.set(u);
  w.set(v, u.length);
  u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(120, 100, 150, 255, 255, 0, 50, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(105, 77, 30, 255, 255, 111, 35, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(90, 111, 35, 255, 255, 77, 30, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(75, 33, 33, 255, 255, 160, 200, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(60, 160, 200, 255, 255, 33, 33, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(45, 76, 21, 255, 255, 200, 50, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
for (i = 0; i < side / 16; i++){
var v = row(30, 200, 50, 255, 255, 76, 21, 255);
var w = new Uint8Array(u.length + v.length);
w.set(u);
w.set(v, u.length);
u = w;
}
arr = u;  
}  

  var texture_colors1 = createDataTexture_4C(gl, side, side, arr);
  var texture_colors2 = createDataTexture_4C(gl, side, side, null);



  arr = new Uint8Array(side*side*4);
  {
  for (i = 0; i < arr.length;i++){
    if (i % 4 == 0){
     /*y*/ var row = 2*((i/4)/ side) / side - .5; //y
     /*x*/ var column = 2*((i/4) % side) / side - .5; //x
      
      // var x = Math.sin(Math.PI*2*row);
      // var x = Math.sin(row);
      // var x = column*Math.sin(Math.PI*2*row);
         var x = Math.log(row*column);
          // x = x*5;
      // var x = 1;
      // var x = 1;
      // var y = Math.cos(Math.PI*2*column);
      var y = Math.log(row/column);
          // y = y*y
      // var y = 0;

      // var angle = Math.atan2(y , x);
      // if (x==0){
      //   angle = Math.PI/2;
      // }
      // if (y==0){
      //   angle = 0;
      // }
      // if (Math.abs(y) < 0.1 ){
      //   angle = 0;
      // }
      
      


      // arr[i] = 255 * Math.sin(Math.PI*2 * ( ( i / 2) % 256) / 256.  ); // angle
      // arr[i] = 255 * Math.sqrt(row**2 + column**2);
      // arr[i] = 255 * angle / (Math.PI * 2) ;
      f_x = Math.floor((x + 1) * (2**16 - 1) / 2);
      f_y = Math.floor((y + 1) * (2**16 - 1) / 2);
      
      arr[i] = Math.floor(f_x / 2**8);
      arr[i + 1] = f_x % 2**8;
      arr[i + 2] = Math.floor(f_y / 2**8);
      arr[i + 3] = f_y % 2**8;
    }
    // else if (i % 4 == 3){
    //   var row = 2*((i/4)/ side) / side - .5;
    //   var column = 2*((i/4) % side) / side - .5;

    //   var x = Math.sin(Math.PI*2*row);
    //   // var x = 1;
    //   var y = Math.sin(Math.PI*2*column);
    //   // var y = 0;

    //   // arr[i] = 255 * Math.sin(Math.PI*2 * ( ( i / 2) % 256) / 256.  ); // angle
    //   arr[i] = 255 * (Math.sqrt((x)**2 + (y)**2));

    //   // arr[i] = 255; //magnitude
    // }
  }
  } 
  velocity_texture1 = createDataTexture_4C(gl, side, side, arr);
  velocity_texture2 = createDataTexture_4C(gl, side, side, null); //ping pong potential

  gl.useProgram(gl.programs['advect']);
  // renderToTexture(gl, null); // switch back to canvas

  // setup texture bindings
{
  gl.activeTexture(gl.TEXTURE0); //activate the first attached texture (just for explicitness since it matters if have multiple textures)


  gl.bindTexture(gl.TEXTURE_2D, texture_colors1); // doesn't matter but may be important if multiple textures just in case
  
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // just in case minmapping wasn't set (but it was in prev functions)

  gl.activeTexture(gl.TEXTURE1); //activate the second attached texture (just for explicitness since it matters if have multiple textures)

  gl.bindTexture(gl.TEXTURE_2D, texture_colors2);

  gl.activeTexture(gl.TEXTURE2); //activate the third attached texture (just for explicitness since it matters if have multiple textures)

  gl.bindTexture(gl.TEXTURE_2D, velocity_texture1);

  gl.activeTexture(gl.TEXTURE3); //activate the third attached texture (just for explicitness since it matters if have multiple textures)

  gl.bindTexture(gl.TEXTURE_2D, velocity_texture2);
}
  
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // set up framebuffers
  fb_colors1 = createFramebuffer_AttachTexture(gl, texture_colors1);
  fb_colors2 = createFramebuffer_AttachTexture(gl, texture_colors2);
  fb_velocity1 = createFramebuffer_AttachTexture(gl, velocity_texture1);
  fb_velocity2 = createFramebuffer_AttachTexture(gl, velocity_texture2);

  // you set variables in glsl 
  gl.uniform1f(gl.shaders['advect'].uniforms['u_deltaTime'], 0.001);


  // rainbowRender(gl, 2, canvas.width, canvas.height);

  renderToTexture(gl, null, canvas.width, canvas.height );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // draw on the canvas according to initialized geometry, shader, and texture

  setInterval(function(){
      // PING advect colors
   gl.useProgram(gl.programs['advect']);
  gl.uniform1i(gl.shaders['advect'].uniforms['u_data'], 0); // must be set to match active texture, i.e. if gl.TEXTURE1 then set it to 1
  gl.uniform1i(gl.shaders['advect'].uniforms['u_velocity'], 2); //velocity texture setting up 
  renderToTexture(gl, null, canvas.width, canvas.height );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // draw on the canvas according to initialized geometry, shader, and texture

  // store colors in seconds colors texture
  renderToTexture(gl, fb_colors2, side, side);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  
  
  // time to advect velocity
  gl.uniform1i(gl.shaders['advect'].uniforms['u_data'], 2); // time to render from velocity instead colors
  // renderToTexture(gl, null, canvas.width, canvas.height);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  renderToTexture(gl, fb_velocity2, side, side);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  // rainbowRender(gl, 2, canvas.width, canvas.height);


  gl.useProgram(gl.programs['advect']);
  // PONG advect colors
  gl.uniform1i(gl.shaders['advect'].uniforms['u_data'], 1); // use 2nd colors texture to render from
  gl.uniform1i(gl.shaders['advect'].uniforms['u_velocity'], 3); // use 2nd velocity texture we just rendered to
  // gl.uniform1i(gl.shaders['advect'].uniforms['u_velocity'], 2); // use 2nd velocity texture we just rendered to
  renderToTexture(gl, null, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  // store colors in first colors texture
  renderToTexture(gl, fb_colors1, side, side);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    // console.log(velocity_texture1);
  // rainbowRender(gl, velocity_texture1, canvas.width, canvas.height);

  //  time to advect velocity
   gl.uniform1i(gl.shaders['advect'].uniforms['u_data'], 3); // time to render from velocity instead colors
  //  renderToTexture(gl, null, canvas.width, canvas.height);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
   renderToTexture(gl, fb_velocity1, side, side);
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  //  rainbowRender(gl, 3, canvas.width, canvas.height);

  }, 15)

  // gl.uniform1i()
  // gl.uniform1i(gl.shaders['advect'].uniforms['u_data'], 1);
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