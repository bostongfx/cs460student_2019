// GLTexture.js

(function(){
	var _this;

	GLTexture = function(gl, source, width, height) {
		_this = this;
		this.gl = gl;
		this.texture = gl.createTexture();
		this.frameBuffer;

		if(source != undefined) {
			//	source : canvas / video / image / pixels
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.generateMipmap(gl.TEXTURE_2D);

			gl.bindTexture(gl.TEXTURE_2D, null);
		} else {
			this.frameBuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
			this.frameBuffer.width = width;
			this.frameBuffer.height = height;

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.generateMipmap(gl.TEXTURE_2D);

	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	        var renderbuffer = gl.createRenderbuffer();
	        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
	        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);

	        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

	        gl.bindTexture(gl.TEXTURE_2D, null);
	        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}

	var p = GLTexture.prototype;

	p.updateTexture = function(source) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);

		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}
	//	FOR RENDER IMAGE

	var vBufferPos, vBufferUV, iBuffer;
	var shaderProgram, vertexShader, fragmentShader;
	var vertexShaderSrc = [
		"attribute vec3 aVertexPosition;",
	    "attribute vec2 aTextureCoord;",

	    "uniform mat4 uMVMatrix;",
	    "uniform mat4 uPMatrix;",

	    "varying vec2 vTextureCoord;",

	    "void main(void) {",
	        "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
	        "vTextureCoord = aTextureCoord;",
	    "}"
	].join("\n");

	var fragmentShaderSrc = [
		"precision mediump float;",

	    "varying vec2 vTextureCoord;",

	    "uniform sampler2D uSampler;",

	    "void main(void) {",
	        "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
	    "}"
	].join("\n");


	window.renderImage = function(gl, textureToRender) {
		if(vertexShader == undefined) {
			vertexShader = getShader(gl, vertexShaderSrc, "vertex");
			fragmentShader = getShader(gl, fragmentShaderSrc, "fragment");

			shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			_initBuffer(gl);
		}


		gl.useProgram(shaderProgram);

		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

		shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

		// gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		// gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	 //    gl.enable(gl.BLEND);

		var mvMatrix = mat4.create();
	  	var pMatrix = mat4.create();
	  	mat4.identity(pMatrix);
	  	mat4.identity(mvMatrix);

	    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferPos);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vBufferPos.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vBufferUV);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vBufferUV.itemSize, gl.FLOAT, false, 0, 0);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, textureToRender.texture);
		gl.uniform1i(shaderProgram.samplerUniform, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix );
		gl.drawElements(gl.TRIANGLES, iBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
	}


	var _initBuffer = function(gl) {
		vBufferPos = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBufferPos);
		var vertices = [
			-1.0, -1.0,  0.0,
	    	 1.0, -1.0,  0.0,
	     	 1.0,  1.0,  0.0,
	    	-1.0,  1.0,  0.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vBufferPos.itemSize = 3;
		vBufferPos.numItems = 4;

		vBufferUV = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBufferUV);
		var uv = [
			0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
		vBufferUV.itemSize = 2;
		vBufferUV.numItems = 4;

		iBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
		var cubeVertexIndices = [
			0, 1, 2,      0, 2, 3  
		];
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
		iBuffer.itemSize = 1;
		iBuffer.numItems = 6;
	}


	var getShader = function(gl, str, type) {
		var shader;
		if(type == "vertex") {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
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