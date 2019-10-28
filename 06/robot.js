Robot = function(x, y, z){
	this.timer = 0;
	this.loop = false;
	//Root Bone
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;
	
	this.neck 			 = createBone(0, -10, 0, this.head);
	this.torso 			 = createBone(0, -25, 0, this.neck);
	this.left_upper_arm  = createBone(10, -7.5, 0, this.neck);
	this.left_lower_arm  = createBone(7.5, -5.5, 0, this.left_upper_arm);
	this.left_hand 		 = createBone(4.5, -2.5, 0, this.left_lower_arm);
	this.right_upper_arm = createBone(-10, -7.5, 0, this.neck);
	this.right_lower_arm = createBone(-7.5, -5.5, 0, this.right_upper_arm);
	this.right_hand      = createBone(-4.5, -2.5, 0, this.right_lower_arm);
	this.left_upper_leg  = createBone(3, -10, 0, this.torso);
	this.left_lower_leg  = createBone(0, -10, 0, this.left_upper_leg);
	this.left_foot       = createBone(5, 0, 2.5,  this.left_lower_leg);
	this.right_upper_leg = createBone(-3, -10, 0, this.torso);
	this.right_lower_leg = createBone(0, -10, 0, this.right_upper_leg);
	this.right_foot 	 = createBone(-5, 0, 2.5, this.right_lower_leg);
	
};

function createBone(x, y, z, parent){
	var newBone = new THREE.Bone();
	newBone.position.x = x;
	newBone.position.y = y;
	newBone.position.z = z;
	parent.add(newBone);
	return newBone;
};

Robot.prototype.show = function(scene){
		rGroup = new THREE.Group();
		rGroup.add(r.head);
		//rGroup.add(r.neck);
		//rGroup.add(r.torso);
		scene.add(rGroup);

		helper = new THREE.SkeletonHelper(rGroup);

		scene.add(helper);

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
		default:
			break;
	}
	
}
