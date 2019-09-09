// GLTextureFilter.js
(function() {

	GLTextureFilter = function(gl, vShader, fShader) {
		this.gl = gl;
		this.id = vShader +"/" + fShader;
		this.vertexShader = getShader(this.gl, vShader);
		this.fragmentShader = getShader(this.gl, fShader);
		this.shaderProgram = null;
		this.vBufferPos = null;
		this.vBufferUV = null;
		this.iBuffer = null;

		this.parameters = [];
		this._init();
	}


	var p = GLTextureFilter.prototype;


	p._init = function() {
		this.shaderProgram = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgram, this.vertexShader);
		this.gl.attachShader(this.shaderProgram, this.fragmentShader);
		this.gl.linkProgram(this.shaderProgram);

		this._initBuffer();
	},


	p._initBuffer = function() {
		this.vBufferPos = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);
		var vertices = [
			-1.0, -1.0,  0.0,
	    	 1.0, -1.0,  0.0,
	     	 1.0,  1.0,  0.0,
	    	-1.0,  1.0,  0.0
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		this.vBufferPos.itemSize = 3;
		this.vBufferPos.numItems = 4;

		this.vBufferUV = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
		var uv = [
			0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(uv), this.gl.STATIC_DRAW);
		this.vBufferUV.itemSize = 2;
		this.vBufferUV.numItems = 4;

		this.iBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
		var cubeVertexIndices = [
			0, 1, 2,      0, 2, 3  
		];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
		this.iBuffer.itemSize = 1;
		this.iBuffer.numItems = 6;
	},


	p.setParameter = function(name, type, value) {
		this.parameters.push( {name:name, type:type, value:value} );
		this.shaderProgram[name] = this.gl.getUniformLocation(this.shaderProgram, name);
	},


	p.apply = function(textures, output) {
		if(output.frameBuffer == undefined) return;

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, output.frameBuffer);
		this.gl.viewport(0, 0, output.frameBuffer.width, output.frameBuffer.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.gl.useProgram(this.shaderProgram);

		this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

		this.shaderProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
		this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);

		this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
		this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");

		for ( var i=0; i<textures.length; i++) {
			this.shaderProgram.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler" + i.toString());
		}
		

		for ( var i=0; i<this.parameters.length; i++) {
			var o = this.parameters[i];
			this.gl[o.type](this.shaderProgram[o.name], o.value);
		}


		var mvMatrix = mat4.create();
	  	var pMatrix = mat4.create();
	  	mat4.identity(pMatrix);
	  	mat4.identity(mvMatrix);

	    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);
		this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vBufferPos.itemSize, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
		this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.vBufferUV.itemSize, this.gl.FLOAT, false, 0, 0);

		for ( var i=0 ; i<textures.length; i++) {
			this.gl.activeTexture(this.gl["TEXTURE"+i.toString()]);
			this.gl.bindTexture(this.gl.TEXTURE_2D, textures[i].texture);
			this.gl.uniform1i(this.shaderProgram.samplerUniform, i);
		}
		

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);

		this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, pMatrix);
		this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix );
		this.gl.drawElements(this.gl.TRIANGLES, this.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

		this.gl.bindTexture(this.gl.TEXTURE_2D, output.texture);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}

	var getShader = function(gl, id) {
		var shaderScript = document.getElementById(id);
	    if (!shaderScript) {
	    	console.log( "Shader not exist:" + id );
	        return null;
	    }

	    var str = "";
	    var k = shaderScript.firstChild;
	    while (k) {
	        if (k.nodeType == 3) {
	            str += k.textContent;
	        }
	        k = k.nextSibling;
	    }
	    
	    var shader;
	    if (shaderScript.type == "x-shader/x-fragment") {
	        shader = gl.createShader(gl.FRAGMENT_SHADER);
	    } else if (shaderScript.type == "x-shader/x-vertex") {
	        shader = gl.createShader(gl.VERTEX_SHADER);
	    } else {
	        return null;
	    }

	    gl.shaderSource(shader, str);
	    gl.compileShader(shader);

	    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        alert(gl.getShaderInfoLog(shader));
	        return null;
	    }

	    return shader;
	}

})();