// ViewTree.js


(function() {
	ViewTree = function(gl, idVertexShader, idFragmentShader, texture) {
		if(gl == undefined) return;
		this.texture = texture;
		this.matrix = mat4.create();
		mat4.identity(this.matrix);
		var scale = 1300;
		mat4.scale(this.matrix, [scale, scale, scale]);
		mat4.translate(this.matrix, [0, 1100/scale, 0]);

		View.call(this, gl, idVertexShader, idFragmentShader);
	}

	var p = ViewTree.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		this._objModel = new bongiovi.ObjModel(this.gl, "./objs/tree.obj");
		this._objModel.setTexture(0, this.texture);
	}


	p.render = function(mvMatrix, pMatrix) {
		var mtx = mat4.create();
		mat4.multiply(mvMatrix, this.matrix, mtx)
		this._objModel.render(this.shader, mtx, pMatrix);
	}

})();