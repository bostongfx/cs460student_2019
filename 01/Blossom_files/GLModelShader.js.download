// GLModelShader.js

if(window.bongiovi === undefined ) window.bongiovi = {};

(function() {
	if(bongiovi.GLModelShader === undefined) {
		var GLModelShader = function GLModelShader(gl, vertexShaderID, fragmentShaderID) {
			if(gl == undefined || vertexShaderID == undefined || fragmentShaderID == undefined) return;

			this.gl = gl;
			this.idVertex = vertexShaderID;
			this.idFragment = fragmentShaderID;
			this.vertexShader = getShader(this.gl, this.idVertex);
			this.fragmentShader = getShader(this.gl, this.idFragment);
			this.parameters = [];

			this.init();
		}


		bongiovi.GLModelShader = GLModelShader;
		var p = GLModelShader.prototype;


		p.init = function() {
			this.shaderProgram = this.gl.createProgram();
			this.gl.attachShader(this.shaderProgram, this.vertexShader);
			this.gl.attachShader(this.shaderProgram, this.fragmentShader);
			this.gl.linkProgram(this.shaderProgram);
		}


		p.setParameter = function(name, type, value) {
			this.parameters.push( {name:name, type:type, value:value} );
			this.shaderProgram[name] = this.gl.getUniformLocation(this.shaderProgram, name);
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
	}
})();