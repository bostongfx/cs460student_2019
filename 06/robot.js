Robot = function(x, y, z) {
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

	this.neck = new THREE.Bone();
	this.neck.position.y = -10; // relative to bone
	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;
	this.head.add(this.torso);

	// left upper appendage
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.x = 10;
	this.left_upper_arm.position.y = -5;
	this.neck.add(this.left_upper_arm);

	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.x = 10;
	this.left_lower_arm.position.y = -15;
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.x = -1;
	this.left_hand.position.y = -5;
	this.left_lower_arm.add(this.left_hand);

	// right upper appendage
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.x = -10;
	this.right_upper_arm.position.y = -5;
	this.neck.add(this.right_upper_arm)

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.x = -10;
	this.right_lower_arm.position.y = -15;
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.x = 1;
	this.right_hand.position.y = -5;
	this.right_lower_arm.add(this.right_hand);

	// left lower appendage
	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 10;
	this.left_upper_leg.position.y = -15;
	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.x = 5;
	this.left_lower_leg.position.y = -15;
	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.x = 5;
	this.left_foot.position.y = -1;
	this.left_lower_leg.add(this.left_foot);

	// right lower appendage
	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.x = -10;
	this.right_upper_leg.position.y = -15;
	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.x = -5;
	this.right_lower_leg.position.y = -15;
	this.right_upper_leg.add(this.right_lower_leg);

	this.right_foot = new THREE.Bone();
	this.right_foot.position.x = -5;
	this.right_foot.position.y = -1;
	this.right_lower_leg.add(this.right_foot);

	// string, controls which animation to run
	// ex. "raise left arm" raises left arm
	this.movement = null;
}

Robot.prototype.show  = function(scene) {
	var rGroup = new THREE.Group();
	rGroup.add(r.head);

	var helper = new THREE.SkeletonHelper(rGroup);
	helper.material.linewidth = 3;	// make the skeleton dummy thicc

	scene.add(rGroup);
	scene.add(helper);
}

Robot.prototype.raise_left_arm = function() {
	this.movement = "raise left arm";
}

Robot.prototype.lower_left_arm = function() {
	this.movement = "lower left arm";
}

Robot.prototype.kick = function() {
	this.movement = "kick";
}

Robot.prototype.onAnimate = function() {
	// gets called each animate loop (every frame)
	var t = Math.PI;

	if (this.movement == null)
		return;

	if (this.movement == "raise left arm") {
		var x = Math.sin(t / 2);
		var y = 0;
		var z = 0;
		var w = Math.cos(t / 2);

		this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(x, y, z, w), 0.1 );
	} else if (this.movement == "lower left arm") {
		var x = Math.cos(t / 2);
		var y = 0;
		var z = 0;
		var w = Math.cos(t / 2);

		this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(x, y, z, w), 0.1 );
	} else if (this.movement == "kick") {
		var x = Math.cos(t);
		var y = 0;
		var z = 0;
		var w = Math.cos(t / 2);

		this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(x, y, z, w), 0.1);
		
	}
}
