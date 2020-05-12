Robot = function(x, y, z){
	
	this.head = new THREE.Bone();
	this.head.position.set( x, y, z);

	this.neck = new THREE.Bone();
	this.neck.position.y = -10; //relative to the head
	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;
	this.neck.add(this.torso);

	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.set(10, -5, 0);
	this.neck.add(this.left_upper_arm);
	
	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.set(5, -10, 0);
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.set(5, -2, 0);
	this.left_lower_arm.add(this.left_hand);

	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.set(-10, -5, 0);
	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.set(-5, -10, 0);
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.set(-5, -2, 0);
	this.right_lower_arm.add(this.right_hand);

	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.set(10, -10, 0);
	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.set(5, -15, 0);
	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.set(4, 0, 0);
	this.left_lower_leg.add(this.left_foot);

	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.set(-10, -10, 0);
	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.set(-5, -15, 0);
	this.right_upper_leg.add(this.right_lower_leg);

	this.right_foot = new THREE.Bone();
	this.right_foot.position.set(-4, 0, 0);
	this.right_lower_leg.add(this.right_foot);

	//this will control which animation to run
	this.movement = null; // for instance 'raise left arm'
};

Robot.prototype.show = function(scene){
    rGroup = new THREE.Group();
    rGroup.add( this.head );
    scene.add( rGroup );

    helper = new THREE.SkeletonHelper( rGroup );
    helper.material.linewidth = 3;

    scene.add( helper );
};

Robot.prototype.raise_left_arm = function(){
	this.movement = 'raise left arm'
};

Robot.prototype.lower_left_arm = function(){
	this.movement = 'lower left arm';
};

Robot.prototype.kick = function(){
	this.movement = 'kick';
};

Robot.prototype.dance = function(){
	this.movement = 'dance';
}

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );

  } else if (this.movement == 'lower left arm'){

  	var T = -Math.PI;
  	this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.cos(T/2),
  															0,
  															0,
  															Math.sin(T/2)), 0.1);



  }	else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI/2;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
                                      
    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } 

};