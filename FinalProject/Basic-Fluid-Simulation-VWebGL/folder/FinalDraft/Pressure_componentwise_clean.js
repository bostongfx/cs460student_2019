
function main() {

  function setupUniform(programName, uniformName) {
    gl.shaders[programName].uniforms[uniformName] = gl.getUniformLocation(gl.programs[programName], uniformName);
    if (!gl.shaders[programName].uniforms[uniformName]){
      console.log('Failed to get the storage location of ' + uniformName + ' in ' + programName);
      return false;
    }
  }

  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  /*Shaders woohoo!*/

      {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "texture.vert", false);
        oReq.send();
        VSHADER_SOURCE = oReq.responseText;
    
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "advect_component.frag", false);
        oReq.send();
        FSHADER_SOURCE = oReq.responseText;

        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'advect_component')) {
          console.log('Failed to intialize shaders.');
          return;
        }

        setupUniform('advect_component', 'u_inverseResolution');
        setupUniform('advect_component', 'u_velocity_x');
        setupUniform('advect_component', 'u_velocity_y');
        setupUniform('advect_component', 'u_deltaTime');
        setupUniform('advect_component', 'u_data');
      }

      {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "texture.vert", false);
        oReq.send();
        VSHADER_SOURCE = oReq.responseText;
    
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "divergence_component.frag", false);
        oReq.send();
        FSHADER_SOURCE = oReq.responseText;
        
        
    
        
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'divergence_component')) {
          console.log('Failed to intialize shaders.');
          return;
        }
    
        setupUniform('divergence_component', 'u_inverseResolution');
        setupUniform('divergence_component', 'u_velocity_x');
        setupUniform('divergence_component', 'u_velocity_y');
        setupUniform('divergence_component', 'u_deltaTime');
        setupUniform('divergence_component', 'u_density');
      }
      

      


      {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "texture.vert", false);
        oReq.send();
        VSHADER_SOURCE = oReq.responseText;
    
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "subtract_component.frag", false);
        oReq.send();
        FSHADER_SOURCE = oReq.responseText;
        
        
    
        
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'subtract_component')) {
          console.log('Failed to intialize shaders.');
          return;
        }
    

        setupUniform('subtract_component', 'u_velocity_component');
        setupUniform('subtract_component', 'u_component');
        setupUniform('subtract_component', 'u_pressure');
        setupUniform('subtract_component', 'u_deltaTime');
        setupUniform('subtract_component', 'u_density');
      }
    
    {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "texture.vert", false);
        oReq.send();
        VSHADER_SOURCE = oReq.responseText;
    
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "pressure.frag", false);
        oReq.send();
        FSHADER_SOURCE = oReq.responseText;
        
        
    
        
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE, 'pressure')) {
          console.log('Failed to intialize shaders.');
          return;
        }
    
        setupUniform('pressure', 'u_inverseResolution');
        setupUniform('pressure', 'u_divergence');
        setupUniform('pressure', 'u_pressure');
      }



  /*Set the vertex information*/
  var n = setupGeometry(gl);
  if (n < 0) {
    console.log('Failed to set the geometry.');
    return;
  }

  // Specify the color for clearing <canvas> (if needed)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture
  deltatime = .07;
  density = 5;
  jacobi_iterations = 5;
  beginRendering(gl, n, deltatime, density, jacobi_iterations);
}
// window.onresize = function(){
//   c = document.getElementById("webgl");
//   c.width = window.innerWidth;
//   c.height = window.innerHeight;
//   gl.viewport(0, 0, c.width, c.height );
// }
function setupGeometry(gl) {
  var verticesTexCoords = new Float32Array([
    /*Vertex coordinates, texture coordinate*/
    -1.0,  1.0,   0.0, 1.0,
    -1.0, -1.0,   0.0, 0.0,
     1.0,  1.0,   1.0, 1.0,
     1.0, -1.0,   1.0, 0.0,
  ]);
  var n = 4;

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

function beginRendering(gl, n, deltatime, density, jacobi_iterations){

  
  side = 512;

  arr = createRainbowChessColorsArray(side); //not proven to work with any side!=512

  var texture_colors1 = createDataTexture_4C(gl, side, side, arr);
  var texture_colors2 = createDataTexture_4C(gl, side, side, null);



  arr_x = new Uint8Array(side*side*4);
  arr_y = new Uint8Array(side*side*4);
  {
    for (i = 0; i < arr.length;i++){
      if (i % 4 == 0){

        // current position of point in grid which goes from (-1, -1) to (1, 1) 
      /*y*/ var p_y = 2*((i/4)/ side) / side - .5;
      /*x*/ var p_x = 2*((i/4) % side) / side - .5;
        

      // velocities at the point (this is the key equation for the initial velocity)
        var v_x = 5*Math.sin(Math.PI*2*p_y);
        var v_y = 5*Math.sin(Math.PI*2*p_x);



        // encode the float into a 4 channel array of colors (0 to 1 each)
        encode_x = convertFromRangeToColor(v_x, -5., 5.);
        encode_y = convertFromRangeToColor(v_y, -5., 5.);

        // store these colors as bytes
        arr_x[i] = Math.floor(encode_x[0]*255);
        arr_x[i + 1] = Math.floor(encode_x[1]*255);
        arr_x[i + 2] = Math.floor(encode_x[2]*255);
        arr_x[i + 3] = Math.floor(encode_x[3]*255);

        arr_y[i] = Math.floor(encode_y[0]*255);
        arr_y[i + 1] = Math.floor(encode_y[1]*255);
        arr_y[i + 2] = Math.floor(encode_y[2]*255);
        arr_y[i + 3] = Math.floor(encode_y[3]*255);
      }
    }
  } 

  velocity_texture1_x = createDataTexture_4C(gl, side, side, arr_x); 
  velocity_texture1_y = createDataTexture_4C(gl, side, side, arr_y);

  velocity_texture2_x = createDataTexture_4C(gl, side, side, null);
  velocity_texture2_y = createDataTexture_4C(gl, side, side, null);
  
  
  divergence_texture = createDataTexture_4C(gl, side, side, null);

  pressure_texture1 = createDataTexture_4C(gl, side, side, null);
  pressure_texture2 = createDataTexture_4C(gl, side, side, null);


  // initialize texture bindings in webgl
  {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture_colors1);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture_colors2);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, velocity_texture1_x);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, velocity_texture1_y);

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, velocity_texture2_x);
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, velocity_texture2_y);

    gl.activeTexture(gl.TEXTURE6);
    gl.bindTexture(gl.TEXTURE_2D, divergence_texture);

    gl.activeTexture(gl.TEXTURE7);
    gl.bindTexture(gl.TEXTURE_2D, pressure_texture1);

    gl.activeTexture(gl.TEXTURE8);
    gl.bindTexture(gl.TEXTURE_2D, pressure_texture2);

  }
  
  

  // set up framebuffers and their indices in webgl
  {
    fb_colors1 = createFramebuffer_AttachTexture(gl, texture_colors1);
    FB_COLORS1 = 0
    fb_colors2 = createFramebuffer_AttachTexture(gl, texture_colors2);
    FB_COLORS2 = 1

    fb_velocity1_x = createFramebuffer_AttachTexture(gl, velocity_texture1_x);
    FB_VELOCITY1_X = 2
    fb_velocity1_y = createFramebuffer_AttachTexture(gl, velocity_texture1_y);
    FB_VELOCITY1_Y = 3

    fb_velocity2_x = createFramebuffer_AttachTexture(gl, velocity_texture2_x);
    FB_VELOCITY2_X = 4
    fb_velocity2_y = createFramebuffer_AttachTexture(gl, velocity_texture2_y);
    FB_VELOCITY2_Y = 5

    fb_divergence = createFramebuffer_AttachTexture(gl, divergence_texture);
    FB_DIVERGENCE = 6

    fb_pressure1 = createFramebuffer_AttachTexture(gl, pressure_texture1);
    FB_PRESSURE1 = 7
    fb_pressure2 = createFramebuffer_AttachTexture(gl, pressure_texture2);
    FB_PRESSURE2 = 8
  }




  function advect_component(u_deltaTime, u_inverseResolution, u_data, u_velocity_x, u_velocity_y, fb_velocity_component){

    // let's advect the data with velocity
    gl.useProgram(gl.programs['advect_component']);

    // setup uniforms
    gl.uniform1f(gl.shaders['advect_component'].uniforms['u_deltaTime'], u_deltaTime);
    gl.uniform2fv(gl.shaders['advect_component'].uniforms['u_inverseResolution'], u_inverseResolution);
    gl.uniform1i(gl.shaders['advect_component'].uniforms['u_data'], u_data);
    gl.uniform1i(gl.shaders['advect_component'].uniforms['u_velocity_x'], u_velocity_x);
    gl.uniform1i(gl.shaders['advect_component'].uniforms['u_velocity_y'], u_velocity_y);

    // store in the framebuffer passed in
    renderToTexture(gl, fb_velocity_component, side, side);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  }

  function subtract_pressure(u_deltaTime, u_density, u_inverseResolution, u_velocity_x, u_velocity_y, fb_velocity_x, fb_velocity_y)
  {
    // first let's calculate divergence
    gl.useProgram(gl.programs['divergence_component']);
    // we will store in divergence texture
    renderToTexture(gl, fb_divergence, side, side );
  
    // initialize uniforms (there are redundancies, but I like being able to batch things)
    gl.uniform1f(gl.shaders['divergence_component'].uniforms['u_deltaTime'], u_deltaTime);
    gl.uniform1f(gl.shaders['divergence_component'].uniforms['u_density'], u_density);
    gl.uniform2fv(gl.shaders['divergence_component'].uniforms['u_inverseResolution'], u_inverseResolution);
    gl.uniform1i(gl.shaders['divergence_component'].uniforms['u_velocity_x'], u_velocity_x);
    gl.uniform1i(gl.shaders['divergence_component'].uniforms['u_velocity_y'], u_velocity_y);
  
    // and calculate!
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  
  
    // time to calculate pressure
    gl.useProgram(gl.programs['pressure']);

    // initialize uniforms
    gl.uniform1i(gl.shaders['pressure'].uniforms['u_divergence'], FB_DIVERGENCE);
    gl.uniform2fv(gl.shaders['pressure'].uniforms['u_inverseResolution'], u_inverseResolution);
  
    // we are doing jacobi iterations to solve the system of pressure equations quickly and accurately
      // thus we must run it multiple times to get more and more accuracy
        // instead of like in linear algebra class where we do it once
    for (i = 0; i < jacobi_iterations; i++){
      
      //ping
      gl.uniform1i(gl.shaders['pressure'].uniforms['u_pressure'], FB_PRESSURE2); // use previous values of 2nd pressure texture
      renderToTexture(gl, fb_pressure1, side, side ); // store result in first pressure texture
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    
      //pong
      gl.uniform1i(gl.shaders['pressure'].uniforms['u_pressure'], FB_PRESSURE1); // use previous values of 1st pressure texture
      renderToTexture(gl, fb_pressure2, side, side );// store result in 2nd pressure texture
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }

    // time to subtract the pressure from the advected velocity
    gl.useProgram(gl.programs['subtract_component']);

    // setup uniforms
    gl.uniform2fv(gl.shaders['subtract_component'].uniforms['u_inverseResolution'], u_inverseResolution);
    gl.uniform1f(gl.shaders['subtract_component'].uniforms['u_deltaTime'], u_deltaTime);
    gl.uniform1f(gl.shaders['subtract_component'].uniforms['u_density'], u_density);
    gl.uniform1i(gl.shaders['subtract_component'].uniforms['u_pressure'], FB_PRESSURE2);
    
    
    // first subtract the pressure in x direction
    gl.uniform1i(gl.shaders['subtract_component'].uniforms['u_velocity_component'], u_velocity_x);
    gl.uniform1i(gl.shaders['subtract_component'].uniforms['u_component'], 0); //0 means x component
    
    renderToTexture(gl, fb_velocity_x, side, side );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);


    // first subtract the pressure in y direction
    gl.uniform1i(gl.shaders['subtract_component'].uniforms['u_velocity_component'], u_velocity_y);
    gl.uniform1i(gl.shaders['subtract_component'].uniforms['u_component'], 1); //1 means y component
    
    renderToTexture(gl, fb_velocity_y, side, side );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  }

  render = function(){
    
    //PING
    // advect velocity in x direction through itself
    advect_component(deltatime, [1./side, 1./side], FB_VELOCITY1_X, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_velocity2_x);
    // advect velocity in y direction through itself
    advect_component(deltatime, [1./side, 1./side], FB_VELOCITY1_Y, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_velocity2_y);
    // subtract calculate and subtract pressure
    subtract_pressure(deltatime, density, [1./side, 1./side], FB_VELOCITY2_X, FB_VELOCITY2_Y, fb_velocity1_x, fb_velocity1_y);
    // advect colors texture 1 through the velocity and store in colors texture 2
    advect_component(deltatime,  [1./side, 1./side], FB_COLORS1, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_colors2);

    // draw it
    renderToTexture(gl, null, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    //PONG
    // do same thing again
    advect_component(deltatime, [1./side, 1./side], FB_VELOCITY1_X, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_velocity2_x);
    advect_component(deltatime, [1./side, 1./side], FB_VELOCITY1_Y, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_velocity2_y);
    subtract_pressure(deltatime, density, [1./side, 1./side], FB_VELOCITY2_X, FB_VELOCITY2_Y, fb_velocity1_x, fb_velocity1_y);

    // except advect colors texture 2 through velocity and store in colors texture 1
    advect_component(deltatime,  [1./side, 1./side], FB_COLORS2, FB_VELOCITY1_X, FB_VELOCITY1_Y, fb_colors1);

    // draw it
    renderToTexture(gl, null, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  }
  
// render every 20 ms
  setInterval(() => {
    render();
  }, 20);

}

// creating textures is boring so I abstracted it
  // 4C means 4 channel
createDataTexture_4C = function(gl, width, height, iData){
  

const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);

{

const level = 0;
const internalFormat = gl.RGBA;
const targetTextureWidth = width;
const targetTextureHeight = height;
const border = 0;
const format = gl.RGBA;
const type = gl.UNSIGNED_BYTE;     
const data = iData;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
              targetTextureWidth, targetTextureHeight, border,
              format, type, data);


gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);


gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

  
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
  renderToTexture(gl, null, canvas.width, canvas.height);
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
  gl.clearColor(1.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

const bitSh = [256. * 256. * 256., 256. * 256., 256., 1.];
const bitMsk = [0., 1./256.0, 1./256.0, 1./256.0];
const bitShifts = [1./(256.0 * 256. * 256.), 1./(256. * 256.), 1./(256.), 1.];

function pack (value) {
    
    comp = [(value * bitSh[0])%1, (value * bitSh[1])%1, (value * bitSh[2])%1, (value * bitSh[3])%1];
    
    comp = [comp[0] - (comp[0] * bitMsk[0]), comp[1] -(comp[0] * bitMsk[1]), comp[2] - (comp[1] * bitMsk[2]), comp[3] - (comp[2] * bitMsk[3])];
    return comp;
}

function unpack (color) {
    return [color[0]*bitShifts[0], color[1]*bitShifts[1], color[2]*bitShifts[2], color[3]*bitShifts[3]];
    
}




function convertFromRangeToColor(value, rangeMin, rangeMax) {
   zeroToOne = (value - rangeMin) / (rangeMax - rangeMin);
   return pack(zeroToOne);
}

function convertFromColorToRange(color, rangeMin, rangeMax) {
   zeroToOne = unpack(color);
   return rangeMin + zeroToOne * (rangeMax - rangeMin);
}

function createRainbowChessColorsArray(side){
  // setup the initial texture for the colors
    // TODO make it possible to do with a png
    row = function(a1, a2, a3, a4, b1, b2, b3, b4){
    
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
  return arr;
}
