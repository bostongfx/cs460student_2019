// ViewGround.js

(function() {
	var NUM = 25;

	ViewGround = function(gl, idVertexShader, idFragmentShader, texture) {
		if(gl == undefined) return;
		this.texture = texture;
		this.matrix = mat4.create();
		this.size = 300;
		this.coords = [];

		this.ambientColor = [30, 30, 30];
		
		//	LIGHT 0
		this.light0X = 0.0;
		this.light0Y = 1.0;
		this.light0Z = 0.0;
		this.lightColor0 = [255, 255, 255];
		this.lightWeight0 = 0.66;
		
		//	LIGHT 1
		this.light1X = 1.0;
		this.light1Y = 0.0;
		this.light1Z = 1.0;
		this.lightColor1 = [200, 200, 255];
		this.lightWeight1 = 0.5;
		
		//	LIGHT 2
		this.light2X = -1.0;
		this.light2Y = 0.0;
		this.light2Z = -1.0;
		this.lightColor2 = [255, 255, 200];
		this.lightWeight2 = 0.5;

		mat4.identity(this.matrix);
		mat4.translate(this.matrix, [0, 1200, 0])
		View.call(this, gl, idVertexShader, idFragmentShader);
	}

	var p = ViewGround.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		this._initGround();
		this._generateMap(this.coords, 1);
		this.apply();
	}


	p._initGround = function() {
		for ( var i=0; i<NUM; i++) {
			this.coords[i] = [];
			for ( var j=0; j<NUM; j++) {
				this.coords[i][j] = Math.random() * 1000;
			}
		}
	}


	p._generateMap = function(coords, ratio) {
		console.log( NUM );
		this.model = new bongiovi.GLModel(this.gl, (NUM-1)*(NUM-1)*4);
		this.model.setTexture(0, this.texture);
		this.model.setAttribute(0, "aVertexNormal", 3);

		this.ratio = ratio;
		this.coords = coords;
		var offset = (NUM-1)*this.size/2;
		
        for ( var i=0; i<(NUM-1); i++) {
            for ( var j=0; j< (NUM-1); j++) {
                var index = i*(NUM-1) + j;
				
				var p0 = vec3.create([i*this.size-this.size-offset, -this.coords[i][j]/10,    j*this.size-this.size-offset]);
				var p1 = vec3.create([i*this.size-offset, -this.coords[i+1][j]/10,       j*this.size-this.size-offset]);
				var p2 = vec3.create([i*this.size-offset, -this.coords[i+1][j+1]/10,     j*this.size-offset]);
				var p3 = vec3.create([i*this.size-this.size-offset, -this.coords[i][j+1]/10,  j*this.size-offset]);
				
                this.model.updateVertex(index*4,    i*this.size-this.size-offset, -this.coords[i][j]/10,    (j*this.size-this.size-offset)*this.ratio ); 
                this.model.updateVertex(index*4+1,  i*this.size-offset, -this.coords[i+1][j]/10,       (j*this.size-this.size-offset)*this.ratio); 
                this.model.updateVertex(index*4+2,  i*this.size-offset, -this.coords[i+1][j+1]/10,     (j*this.size-offset)*this.ratio); 
                this.model.updateVertex(index*4+3,  i*this.size-this.size-offset, -this.coords[i][j+1]/10,  (j*this.size-offset)*this.ratio);

                this.model.updateTextCoord(index*4,   0, 0);
                this.model.updateTextCoord(index*4+1, 1, 0);
                this.model.updateTextCoord(index*4+2, 1, 1);
                this.model.updateTextCoord(index*4+3, 0, 1); 
				
				n0 = computeSurfaceNormal(p0, p1, p2);
				n1 = computeSurfaceNormal(p0, p2, p3);
				
				this.model.updateAttribute(0, index*4,     n0);
				this.model.updateAttribute(0, index*4+1,   n0);
				this.model.updateAttribute(0, index*4+2,   n0);
				this.model.updateAttribute(0, index*4+3,   n0);
            }
        }
		
		this.model.generateBuffer();
	}


	p.render = function(camera, projection) {
		var mtx = mat4.create();
		mat4.multiply(camera, this.matrix, mtx)

		this.model.render(this.shader, mtx, projection );
	}


	p.apply = function() {
		var lightingDirection0 = [this.light0X, this.light0Y, this.light0Z];
        var adjustedLD0 = vec3.create();
        vec3.normalize(lightingDirection0, adjustedLD0);
        vec3.scale(adjustedLD0, -1);

        var lightingDirection1 = [this.light1X, this.light1Y, this.light1Z];
        var adjustedLD1 = vec3.create();
        vec3.normalize(lightingDirection1, adjustedLD1);
        vec3.scale(adjustedLD1, -1);
		
        var lightingDirection2 = [this.light2X, this.light2Y, this.light2Z];
        var adjustedLD2 = vec3.create();
        vec3.normalize(lightingDirection2, adjustedLD2);
        vec3.scale(adjustedLD2, -1);
		
		
		this.shader.setParameter("uAmbientColor", "uniform3fv", [this.ambientColor[0]/255, this.ambientColor[1]/255, this.ambientColor[2]/255] );
		this.shader.setParameter("uLightingDirection0", "uniform3fv", adjustedLD0);
		this.shader.setParameter("uDirectionalColor0", "uniform3fv", [this.lightColor0[0]/255, this.lightColor0[1]/255, this.lightColor0[2]/255] );
		this.shader.setParameter("lightWeight0", "uniform1f", this.lightWeight0 );

		this.shader.setParameter("uLightingDirection1", "uniform3fv", adjustedLD1);
		this.shader.setParameter("uDirectionalColor1", "uniform3fv", [this.lightColor1[0]/255, this.lightColor1[1]/255, this.lightColor1[2]/255] );
		this.shader.setParameter("lightWeight1", "uniform1f", this.lightWeight1 );
			
		this.shader.setParameter("uLightingDirection2", "uniform3fv", adjustedLD2);
		this.shader.setParameter("uDirectionalColor2", "uniform3fv", [this.lightColor2[0]/255, this.lightColor2[1]/255, this.lightColor2	[2]/255] );
		this.shader.setParameter("lightWeight2", "uniform1f", this.lightWeight2 );
	}


	var computeSurfaceNormal = function(p1, p2, p3) {
		var tmp = [];
		
		var u = vec3.subtract(p2, p1);
		var v = vec3.subtract(p3, p1);
		tmp[0] = u[1] * v[2] - u[2] * v[1];
		tmp[1] = u[2] * v[0] - u[0] * v[2];
		tmp[2] = u[0] * v[1] - u[1] * v[0];
		
		var v = vec3.create(tmp);
		vec3.normalize(v);
		tmp = [v[0], v[1], v[2]];
		
		return tmp;
	}

})();