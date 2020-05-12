// ViewBg.js

(function() {
	ViewBg = function(gl, idVertexShader, idFragmentShader, texture) {
		if(gl == undefined) return;
		this.textureBG = texture;
		View.call(this, gl, idVertexShader, idFragmentShader);
	}

	var p = ViewBg.prototype;


	p._init = function() {
		this.matrix = mat4.create();
		mat4.identity(this.matrix);

		this.model = new bongiovi.GLModel(gl, 4);
        this.model.updateVertex(0, -1, -1, .99);
        this.model.updateVertex(1,  1, -1, .99);
        this.model.updateVertex(2,  1,  1, .99);
        this.model.updateVertex(3, -1,  1, .99);

        this.model.updateTextCoord(0, 0, 0);
        this.model.updateTextCoord(1, 1, 0);
        this.model.updateTextCoord(2, 1, 1);
        this.model.updateTextCoord(3, 0, 1); 
        this.model.setTexture(0, this.textureBG);
        this.model.generateBuffer();
	}

	p.render = function() {
		this.model.render(this.shader, this.matrix, this.matrix);
	}
})();