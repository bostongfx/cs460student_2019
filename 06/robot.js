Robot = function(x,y,z) {
	
	this.head = new THREE.Bone();
		this.head.position.x = x;
		this.head.position.y = y; 
		this.head.position.z = z;
		
	this.neck = new THREE.Bone();
		this.neck.position.y = -10;
		this.head.add(this.neck); // add 'neck' to be the child of 'head'
		
	this.torso = new THREE.Bone();
		this.torso.position.y = -30;
		this.neck.add(this.torso); // add 'torso' to be the child of 'neck'
		
	//left arm
	this.left_upper_arm = new THREE.Bone();
		this.left_upper_arm.position.x = 10;	//relative to the neck
		this.left_upper_arm.position.y = -5;
		this.neck.add(this.left_upper_arm);
		
	this.left_lower_arm = new THREE.Bone();
		this.left_lower_arm.position.x = 10;	//relative to the upper arm
		this.left_lower_arm.position.y = -15;
		this.left_upper_arm.add(this.left_lower_arm);
		
	this.left_hand = new THREE.Bone();
		this.left_hand.position.x = -5;			//relative to the lower arm
		this.left_hand.position.y = -10;
		this.left_lower_arm.add(this.left_hand);
		
	//right arm
	this.right_upper_arm = new THREE.Bone();
		this.right_upper_arm.position.x = -10;	//relative to the neck
		this.right_upper_arm.position.y = -5;
		this.neck.add(this.right_upper_arm);	
		
	this.right_lower_arm = new THREE.Bone();
		this.right_lower_arm.position.x = -10;	//relative to the upper arm
		this.right_lower_arm.position.y = -15;
		this.right_upper_arm.add(this.right_lower_arm);	
		
	this.right_hand = new THREE.Bone();
		this.right_hand.position.x = 5;			//relative to the lower arm
		this.right_hand.position.y = -10;
		this.right_lower_arm.add(this.right_hand);
		
	//left leg
	this.left_upper_leg = new THREE.Bone();
		this.left_upper_leg.position.x = -7;			//relative to the torso
		this.left_upper_leg.position.y = -15;
		this.torso.add(this.left_upper_leg);
		
	this.left_lower_leg = new THREE.Bone();
		this.left_lower_leg.position.x = 0;			//relative to the upper leg
		this.left_lower_leg.position.y = -15;
		this.left_upper_leg.add(this.left_lower_leg);
		
	this.left_foot = new THREE.Bone();
		this.left_foot.position.x = 0;				//relative to the lower leg
		this.left_foot.position.z = 5;
		this.left_lower_leg.add(this.left_foot);	
	//right leg
	this.right_upper_leg = new THREE.Bone();
		this.right_upper_leg.position.x = 7;			//relative to the torso
		this.right_upper_leg.position.y = -15;
		this.torso.add(this.right_upper_leg);
		
	this.right_lower_leg = new THREE.Bone();
		this.right_lower_leg.position.x = 0;			//relative to the upper leg
		this.right_lower_leg.position.y = -15;
		this.right_upper_leg.add(this.right_lower_leg);
	this.right_foot = new THREE.Bone();
		this.right_foot.position.x = 0;				//relative to the lower leg
		this.right_foot.position.z = 5;
		this.right_lower_leg.add(this.right_foot);
		
	//control which animation to run
	this.movement = null; // 'raise left arm'
	
	
	
}
/*
function createBone(name,x,y,z,father){
	//this.name = new THREE.Bone();
	this.name.position.y = -30;
	this.father.add(this.name); // add 'torso' to be the child of 'neck'
}*/

Robot.prototype.show = function(scene) {
	rGroup = new THREE.Group();
	rGroup.add(r.head);
	scene.add(rGroup);
	
	helper = new THREE.SkeletonHelper(rGroup);
	scene.add(helper);
}


Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
};
Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
};
Robot.prototype.kick = function() {
	this.movement = 'kick';
};

Robot.prototype.dance = function() {
	this.movement = 'dance';
};

Robot.prototype.onAnimate = function() {
	// called on each animate loop on every frame
	
	//console.log('animate loop');
	//check which movement is requested;
	if(this.movement == 'raise left arm') {
		var T=-Math.PI;
		this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
												Math.sin(T/2)*1,		//x
												0,						//y
												0,						//z
												Math.cos(T/2)*1),		//w
												0.1 );
	} 
	else if(this.movement == 'lower left arm') {
		this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1),0.1 );
		
	} 
	else if (this.movement == 'kick') {
		if(this.right_upper_leg.quaternion.w < 0.72) {
			this.movement = 'kick done';
		}
		else {
			var T = -Math.PI/2;
			this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
												Math.sin(T/2)*1,		//x
												0,					//y
												0,					//z
												Math.cos(T/2)*1),		//w
												0.1 );
		}
	} else if(this.movement == 'kick done') {
		
		this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0,0,0,1),0.1);
	  }
	  
	  /*else if(this.movement == 'dance') {
		var i;
		for(i = 0; i< 10; i++) {
			setTimeout(this.kick(), 3000);
			setTimeout(this.raise_left_arm(), 3000);
			//this.raise_left_arm();
		}
	  }*/
	}



















