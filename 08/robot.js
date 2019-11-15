Robot = function(x, y, z){
	this.timer = 0;
	this.loop = false;
	
	var color;
	var random = Math.random();
	if(random <= 0.33)
		color = "blue";
	else if(random > 0.33 && random <= 0.66)
		color = "green";
	else
		color = "red";
	
	//Create Upperbody
	var from_helper = HELPER.cylinderSkeletonMesh(3, 2, color);
	var geom = from_helper[0];
	var mat = from_helper[1];
	var bones = from_helper[2];
	var mesh = new THREE.SkinnedMesh(geom, mat);
	var skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);
	
	this.root 			 = createBone(x, y, z, bones[0]);
	this.head 			 = createBone(0, 0, 0, bones[1]);
	this.neck 			 = createBone(0, -10, 0, bones[2]);
	this.torso 			 = createBone(0, -25, 0, bones[3]);
	
	this.body_mesh = mesh;
	
	//Create Left Arm
	from_helper = HELPER.cylinderSkeletonMesh(3, 2, color);
	geom = from_helper[0];
	mat = from_helper[1];
	bones = from_helper[2];
	mesh = new THREE.SkinnedMesh(geom, mat);
	skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);
	this.neck.add(bones[0]);
	
	this.left_upper_arm  = createBone(10, -7.5, 0, bones[1]);
	this.left_lower_arm  = createBone(7.5, -5.5, 0, bones[2]);
	this.left_hand 		 = createBone(4.5, -2.5, 0, bones[3]);
	
	this.left_arm_mesh = mesh;
	
	
	//Create Right Arm
	from_helper = HELPER.cylinderSkeletonMesh(3, 2, color);
	geom = from_helper[0];
	mat = from_helper[1];
	bones = from_helper[2];
	mesh = new THREE.SkinnedMesh(geom, mat);
	skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);
	this.neck.add(bones[0]);
	
	this.right_upper_arm = createBone(-10, -7.5, 0, bones[1]);
	this.right_lower_arm = createBone(-7.5, -5.5, 0, bones[2]);
	this.right_hand      = createBone(-4.5, -2.5, 0, bones[3]);
	
	this.right_arm_mesh = mesh;
	
	//Create Left Leg
	from_helper = HELPER.cylinderSkeletonMesh(3, 2, color);
	geom = from_helper[0];
	mat = from_helper[1];
	bones = from_helper[2];
	mesh = new THREE.SkinnedMesh(geom, mat);
	skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);
	this.torso.add(bones[0]);
	
	this.left_upper_leg  = createBone(3, -10, 0, bones[1]);
	this.left_lower_leg  = createBone(0, -10, 0, bones[2]);
	this.left_foot       = createBone(5, 0, 2.5, bones[3]);
	
	this.left_leg_mesh = mesh;
	
	//Create Right Leg
	from_helper = HELPER.cylinderSkeletonMesh(3, 2, color);
	geom = from_helper[0];
	mat = from_helper[1];
	bones = from_helper[2];
	mesh = new THREE.SkinnedMesh(geom, mat);
	skeleton = new THREE.Skeleton(bones);
	mesh.add(bones[0]);
	mesh.bind(skeleton);
	this.torso.add(bones[0]);
	
	this.right_upper_leg = createBone(-3, -10, 0, bones[1]);
	this.right_lower_leg = createBone(0, -10, 0,  bones[2]);
	this.right_foot 	 = createBone(-5, 0, 2.5, bones[3]);
	
	this.right_leg_mesh = mesh;

	
};

function createBone(x, y, z, parent){
	var newBone = parent;
	newBone.position.x = x;
	newBone.position.y = y;
	newBone.position.z = z;
	return newBone;
};

Robot.prototype.show = function(scene){


		/*
		rGroup = new THREE.Group();
		rGroup.add(r.head);
		//rGroup.add(r.neck);
		//rGroup.add(r.torso);
		scene.add(rGroup);

		helper = new THREE.SkeletonHelper(rGroup);

		scene.add(helper);
		*/
		scene.add(this.body_mesh);
		scene.add(this.left_arm_mesh);
		scene.add(this.right_arm_mesh);
		scene.add(this.left_leg_mesh);
		scene.add(this.right_leg_mesh);
};

Robot.prototype.raise_left_arm = function(){
	this.movement = "raise left arm";
};
Robot.prototype.lower_left_arm = function(){
	this.movement = "lower left arm";
};
Robot.prototype.kick = function(){
	this.movement = "kick";
};
Robot.prototype.dance = function(){
	this.movement = "dance";
}
Robot.prototype.walk = function(){
	this.movement = "walk";
}

Robot.prototype.onStep = function(){
	this.root.translateZ(10);
	if(Math.abs(this.root.position.z) > 500 || Math.abs(this.root.position.x) > 500)
		this.root.rotateY(Math.PI);
}

Robot.prototype.onAnimate = function(){
	var T = -Math.PI;
	switch(this.movement){
		case "raise left arm":
			this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
																		Math.sin(T/2),
																		0,
																		0,
																		Math.cos(T/2)), 0.1);
			break;
		case "lower left arm":
			this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
			break;
		case "kick":
			if(this.right_upper_leg.quaternion.w < 0.5){
				this.movement = "kick done";
			}
			else{
				this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
																			Math.sin(T/2),
																			0,
																			0,
																			Math.cos(T/2)), 0.1);
			}
			break;
		case "kick done":
			this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
			break;
		case "dance":

			this.timer += 0.1;
			if(this.timer > 1){
				this.timer = 0;
				this.loop = !this.loop;
			}
			if(this.loop){
				this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(
																		0,
																		0,
																		0,
																		Math.cos(T/2)), 0.1);
				this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
																		Math.sin(T/2),
																		Math.sin((T/2) * 0.4),
																		0,
																		Math.cos(T/2)), 0.1);
				this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(
																		Math.sin((T/2) * 2.0),
																		-Math.sin((T/2) * 2.3),
																		0,
																		Math.cos(T/2)), 0.1);
				this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
																		Math.sin(T/2),
																		Math.sin((T/2) * 0.4),
																		0,
																		Math.cos(T/2)), 0.1);
			}
			else{
				this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(
																		Math.sin(T/2),
																		-Math.sin((T/2) * 0.3),
																		0,
																		Math.cos(T/2)), 0.1);	
				this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
																		0,
																		Math.sin(-(T/2) * 0.4),
																		0,
																		Math.cos(-T/2)), 0.1);
				this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(
																		0,
																		Math.sin((T/2) * .3),
																		0,
																		Math.cos(T/2)), 0.1);
				this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
																		0,
																		0,
																		0,
																		1), 0.1);
			}
			break;
		case "walk":
			if(this.left_upper_leg.quaternion.w < 0.90 && this.right_upper_leg.quaternion.w > .93){
				this.movement = "walk2";
			}
			else{
				this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(
																			Math.sin(T/2),
																			0,
																			0,
																			Math.cos(T/2)), 0.1);
				this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
																			0,
																			0,
																			0,
																			1), 0.3);
				this.onStep();
			}
			break;
		case "walk2":
			if(this.right_upper_leg.quaternion.w < 0.90 && this.left_upper_leg.quaternion.w > .93){
				this.movement = "walk";
			}
			else{
				this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
																			Math.sin(T/2),
																			0,
																			0,
																			Math.cos(T/2)), 0.1);
				this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(
																			0,
																			0,
																			0,
																			1), 0.3);
				this.onStep();
			}
			break;
		default:
			break;
	}
	
}
