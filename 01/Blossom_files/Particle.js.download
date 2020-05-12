// Particle.js

(function() {

	Particle = function(x, y, z) {
		if(x == undefined) return;
		this.x = x;
		this.y = y;
		this.z = z;

		this.vx = 0;
		this.vy = 0;
		this.vz = 0;

		this.rx = 0;
		this.ry = 0;
		this.rz = 0;

		this.vrx = 0;
		this.vry = 0;
		this.vrz = 0;

		this.offset = 1;
		this.life = 0;
		this.u = 0;
		this.v = 0;
		this.size = 0;
		this.maxLife = 0;

		this.offset0 = [];
		this.offset1 = [];
		this.offset2 = [];
	}


	var p = Particle.prototype;

	p.update = function() {
		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
		this.rx += this.vrx;
		this.ry += this.vry;
		this.rz += this.vrz;
		this.life --;
	}



})();