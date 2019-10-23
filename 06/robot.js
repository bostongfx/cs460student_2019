Robot = function( x , y , z ) {

Robot.prototype.show = function(scene) {

  var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 10; // make the skeleton thick

  scene.add(rGroup);
  scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
	console.log("This was raise left arm");
	};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
	console.log("This was lower left arm");
	};

Robot.prototype.kick = function() {
	this.movement = 'kick';
	console.log("This was a kick");
	};

Robot.prototype.onAnimate = function() {

	if (this.movement == 'raise left arm') {
		console.log("RLA");
		// ... TODO slerping
		// Move left arm up
	} else if (this.movement == 'lower left arm') {
		console.log("LLA");
		// ... TODO slerping
		// Move left arm down
	} else if (this.movement == 'kick') {
		console.log("KICK");
		// ... TODO slerping and check once it is done for a backwards slerp
		// you can use the identity quaternion for a backwards slerp
	}
};

// head
this.head = new THREE.Bone();
this.head.position.set( x, y, z );

this.neck = new THREE.Bone();
this.neck.position.y = -10;

this.head.add(this.neck);

this.torso = new THREE.Bone();
this.torso.position.y = -30;

this.neck.add(this.torso);

// left arm
this.left_upper_arm = new THREE.Bone();
this.left_upper_arm.position.x = 10;

this.neck.add(this.left_upper_arm);

this.left_lower_arm = new THREE.Bone();
this.left_lower_arm.position.x = 10;
this.left_lower_arm.position.y = -10;

this.left_upper_arm.add(this.left_lower_arm);

this.left_hand = new THREE.Bone();
this.left_hand.position.x = 5;
this.left_hand.position.y = -15;

this.left_lower_arm.add(this.left_hand);

// right arm
this.right_upper_arm = new THREE.Bone();
this.right_upper_arm.position.x = -10;

this.neck.add(this.right_upper_arm);

this.right_lower_arm = new THREE.Bone();
this.right_lower_arm.position.x = -10;
this.right_lower_arm.position.y = 10;

this.right_upper_arm.add(this.right_lower_arm);

this.right_hand = new THREE.Bone();
this.right_hand.position.x = -5;
this.right_hand.position.y = 15;

this.right_lower_arm.add(this.right_hand);

// left leg
this.left_upper_leg = new THREE.Bone();
this.left_upper_leg.position.x = 10;
this.left_upper_leg.position.y = -10;

this.torso.add(this.left_upper_leg);

this.left_lower_leg = new THREE.Bone();
this.left_lower_leg.position.x = 8;
this.left_lower_leg.position.y = -15;

this.left_upper_leg.add(this.left_lower_leg);

this.left_foot = new THREE.Bone();
this.left_foot.position.x = 5;
this.left_foot.position.y = -15;

this.left_lower_leg.add(this.left_foot);

// right leg
this.right_upper_leg = new THREE.Bone();
this.right_upper_leg.position.x = -10;
this.right_upper_leg.position.y = -10;

this.torso.add(this.right_upper_leg);


this.right_lower_leg = new THREE.Bone();
this.right_lower_leg.position.x = -8;
this.right_lower_leg.position.y = -15;

this.right_upper_leg.add(this.right_lower_leg);

this.right_foot = new THREE.Bone();
this.right_foot.position.x = -5;
this.right_foot.position.y = -15;

this.right_lower_leg.add(this.right_foot);

};

