Robot = function(){
	this.head = new THREE.Bone();
	this.head.position.y = -55;
	this.neck = new THREE.Bone();
	this.neck.position.y = -10;
	this.torso = new THREE.Bone();
	this.torso.position.y = -10;
	this.head.add(this.neck);
	this.neck.add(this.torso);
	
	this.left_upper_arm = null;
	this.left_upper_arm.x = 10;
	
	this.neck.add(this.left_upper_arm);
	
	this.left_lower_arm = null;
	this.left_hand = null;

	//
	this.right_upper_arm = null;
	this.right_lower_arm = null;
	this.right_hand = null;
	
	this.left_upper_leg = null;
	this.left_lower_leg = null;
	this.left_foot = null;
	
	
	//
	this.right_upper_leg = null;
	this.right_lower_leg = null;
	this.right_foot = null;
	
};