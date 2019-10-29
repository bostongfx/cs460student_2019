Robot = function(x,y,z) {
	this.head = new THREE.Bone();
	this.head.position.set(x,y,z);


	this.neck = new THREE.Bone();
	this.neck.position.y = -10;

	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;

	this.neck.add(this.torso);

	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.x = 10; 
	this.left_upper_arm.position.y = -5; 

	this.neck.add(this.left_upper_arm);

	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.x = 10;
	this.left_lower_arm.position.y = -15;

	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.x = 5;

	this.left_lower_arm.add(this.left_hand);

	this.right_upper_arm = new THREE.Bone();			
	this.right_upper_arm.position.x = -10;
	this.right_upper_arm.position.y = -5;

	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.x = -10;
	this.right_lower_arm.position.y = -15;
	
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.x = -5;

	this.right_lower_arm.add(this.right_hand);

	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 10;
	this.left_upper_leg.position.y = -10;

	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.x = 10;
	this.left_lower_leg.position.y = -10;

	this.left_upper_leg.add(this.left_lower_leg);

	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.x = -10;
	this.right_upper_leg.position.y = -10;

	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.x = -10;
	this.right_lower_leg.position.y = -10; 

	this.right_upper_leg.add(this.right_lower_leg);


	this.movement = null; 

}


Robot.prototype.show = function(scene) {
	var rGroup = new THREE.Group();
	rGroup.add(this.head);

	scene.add(rGroup);

	helper = new THREE.SkeletonHelper( rGroup);
	helper.material.linewidth = 3;

	scene.add(rGroup);
	scene.add(helper);


}

Robot.prototype.raiseLeftArm = function() {

	this.movement = 'raise left arm';

}

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm'
}

Robot.prototype.kick = function() {
	this.movement = 'kick'; 
}

Robot.prototype.onAnimate = function() {
	if (this.movement ==  'raise left arm') {
		var T = -Math.PI;
		this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(T/2), 
			0, 0, Math.cos(T/2)), 0.1);
	}
	else if (this.movement == 'lower left arm') {
		this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1); 
	} 
	else if (this.movement == 'kick') {
		if (this.right_upper_leg.quaternion.w < 0.72) {

		this.movement = 'kick done';

		}
		else {
			var T = -Math.PI/2; 
			this.right_upper_leg.quaternion.slerp( new THREE.Quaternion 
				(Math.sin (T/2 ), 
				0, 
				0, 
				Math.cos(T/2)), 0.1);
		}

		
	} else if (this.movement == 'kick done') {

	this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1), 0.1);
	}

}