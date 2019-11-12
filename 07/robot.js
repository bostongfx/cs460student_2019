Robot = function(x, y, z) {
	// --- create head, neck, and torso ---
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
	var geometry = fromhelper[0];
	var material = fromhelper[1];
	var bones = fromhelper[2];

	var mesh = new THREE.SkinnedMesh(geometry, material);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);

	this.root = bones[0];
	this.root.position.set(x, y, z);

	this.head = bones[1];
	this.neck = bones[2];
	this.neck.position.y = -10;
	this.torso = bones[3];
	this.torso.position.y = -30;

	this.body_mesh = mesh;
	// --- end of head, neck, torso ---

	// --- start of left arm ---
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "blue");
	var geometry = fromhelper[0];
	var material = fromhelper[1];
	var bones = fromhelper[2];

	var mesh = new THREE.SkinnedMesh(geometry, material);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);

	this.neck.add(bones[0]);

	this.left_upper_arm = bones[1];
	this.left_upper_arm.position.x = 10;
	this.left_upper_arm.position.y = -5;

	this.left_lower_arm = bones[2];
	this.left_lower_arm.position.x = 10;
	this.left_lower_arm.position.y = -15;

	this.left_hand = bones[3];
	this.left_hand.position.x = -1;
	this.left_hand.position.y = -5;

	this.left_arm_mesh = mesh;
	// --- end of left arm ---

	// --- start of right arm ---
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "blue");
	var geometry = fromhelper[0];
	var material = fromhelper[1];
	var bones = fromhelper[2];

	var mesh = new THREE.SkinnedMesh(geometry, material);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);

	this.right_upper_arm = bones[1];
	this.right_upper_arm.position.x = -10;
	this.right_upper_arm.position.y = -5;

	this.right_lower_arm = bones[2];
	this.right_lower_arm.position.x = -10;
	this.right_lower_arm.position.y = -15;

	this.right_hand = bones[3];
	this.right_hand.position.x = 1;
	this.right_hand.position.y = -5;

	this.right_arm_mesh = mesh;
	// --- end of right arm ---

	// --- start of left leg ---
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "blue");
	var geometry = fromhelper[0];
	var material = fromhelper[1];
	var bones = fromhelper[2];

	var mesh = new THREE.SkinnedMesh(geometry, material);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);

	this.left_upper_leg = bones[1];
	this.left_upper_leg.position.x = 10;
	this.left_upper_leg.position.y = -15;

	this.left_lower_leg = bones[2];
	this.left_lower_leg.position.x = 5;
	this.left_lower_leg.position.y = -15;

	this.left_foot = bones[3];
	this.left_foot.position.x = 5;
	this.left_foot.position.y = -1;

	this.left_leg_mesh = mesh;
	// --- end of left leg ---

	// --- start of right leg ---
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "blue");
	var geometry = fromhelper[0];
	var material = fromhelper[1];
	var bones = fromhelper[2];

	var mesh = new THREE.SkinnedMesh(geometry, material);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);

	this.right_upper_leg = bones[1];
	this.right_upper_leg.position.x = -10;
	this.right_upper_leg.position.y = -15;

	this.right_lower_leg = bones[2];
	this.right_lower_leg.position.x = -5;
	this.right_lower_leg.position.y = -15;

	this.right_foot = bones[3];
	this.right_foot.position.x = -5;
	this.right_foot.position.y = -1;

	this.right_leg_mesh = mesh;
	// --- end of right leg ---

	// string, controls which animation to run
	// ex. "raise left arm" raises left arm
	this.movement = null;
}

Robot.prototype.show  = function(scene) {
	scene.add(this.body_mesh);
	//var rGroup = new THREE.Group();
	//rGroup.add(r.head);

	//var helper = new THREE.SkeletonHelper(rGroup);
	//helper.material.linewidth = 3;	// make the skeleton dummy thicc

	//scene.add(rGroup);
	//scene.add(helper);
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
