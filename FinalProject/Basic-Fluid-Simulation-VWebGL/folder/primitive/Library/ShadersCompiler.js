function compileShaders(gl, ShaderData){

    var shaders = [];

    ShaderData.forEach(data => {
        v_shader = gl.createShader( gl.VERTEX_SHADER );
        f_shader = gl.createShader( gl.FRAGMENT_SHADER );

        


        
        gl.shaderSource( v_shader, data[0] );
        gl.compileShader( v_shader );
        if (!gl.getShaderParameter( v_shader, gl.COMPILE_STATUS)) {
            console.log("Error in: Vertex Shader: " + data[2]);
            console.log(gl.getShaderInfoLog( v_shader ));
        }

        gl.shaderSource( f_shader, data[1]);
        gl.compileShader( f_shader );
        if (!gl.getShaderParameter( f_shader, gl.COMPILE_STATUS)) {
            console.log("Error in: Fragment Shader: " + data[2]);
            console.log(gl.getShaderInfoLog( f_shader ));
        }

        shaderprogram = gl.createProgram();
        gl.attachShader( shaderprogram, v_shader );
        gl.attachShader( shaderprogram, f_shader );
        gl.linkProgram( shaderprogram );
        
        shaders[data[2]] = shaderprogram;
    });

    return shaders;
}