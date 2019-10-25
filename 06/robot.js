Robot = function( x , y , z ) {
// head
this.head = new THREE.Bone();
this.head.position.set( x, y, z );

this.neck = new THREE.Bone();
this.neck.position.y = -10;

this.head.add(this.neck);

this.torso = new THREE.Bone();
this.torso.position.y = -30;

this.neck.add(this.torso);

// TODO add left shoulders?

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

// TODO add right shoulders?

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

this.movement = null;

};

Robot.prototype.show = function(scene) {

  var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 10; // make the skeleton thick

  scene.add(rGroup);
  scene.add(helper);

};

Robot.prototype.onAnimate = function() {

	// console.log("animate");

	if (this.movement == 'raise left arm') {
		console.log("RLA");
		var T = -Math.PI;
		this.left_upperarm.quaternion.slerp( new THREE.Quaternion(
		Math.sin(T/2),   // x
        0,               // y
        0,               // z
        Math.cos(T/2)),  // w
        0.1 );
	} else if (this.movement == 'lower left arm') {
		console.log("LLA");
		// ... TODO slerping
		// Move left arm down
	} else if (this.movement == 'kick') {
		console.log("KICK");
		// check if slerp reached almost the end
		if (this.right_upperleg.quaternion.w < 0.72) {
			// signal that the kick is done and the leg should move back
			this.movement = 'kick done';
 
    } else {
 
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( 
      Math.sin( T / 2 ),   // x
      0,                   // y
      0,                   // z
      Math.cos( T / 2 ) ), // w
      0.1 );
                                      
    }
 
  } else if (this.movement == 'kick done') {
 
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
		// ... TODO slerping and check once it is done for a backwards slerp
		// you can use the identity quaternion for a backwards slerp
	}
};

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
	console.log("This was raise left arm");
	// T = Math.PI;
	// r.left_upper_arm.quaternion.x = Math.sin(T/2) // 1
	// r.left_upper_arm.quaternion.y = 0
	// r.left_upper_arm.quaternion.z = 0
	// r.left_upper_arm.quaternion.w = Math.cos(T/2) // 0

	// this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
	// 	Math.sin(T/2),
	// 	y,
	// 	z,
	// 	Math.cos(T/2)
	// ), 0.1 )
	};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
	console.log("This was lower left arm");
	// T = 2 * Math.PI;
	// r.left_upper_arm.quaternion.x = Math.sin(T/2) // 1
	// r.left_upper_arm.quaternion.y = 0
	// r.left_upper_arm.quaternion.z = 0
	// r.left_upper_arm.quaternion.w = Math.cos(T/2) // 1

	// this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
	// 	x,
	// 	y,
	// 	z,
	// 	w
	// ), 0.1 )
	};

Robot.prototype.kick = function() {
	this.movement = 'kick';
	console.log("This was a kick");
	};
