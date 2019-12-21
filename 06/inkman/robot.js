Robot = function(x, y, z) {
  
  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;


  this.neck = new THREE.Bone();
  this.neck.position.y = -10; // relative to the head

  this.head.add(this.neck);




  this.torso = new THREE.Bone();
  this.torso.position.y = -30; // relative to the neck

  this.neck.add(this.torso);




  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.x = 10; // relative to the neck
  this.left_upper_arm.position.y = -5;

  this.neck.add(this.left_upper_arm);



  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.x = 10; // relative to the upper arm
  this.left_lower_arm.position.y = -15;

  this.left_upper_arm.add(this.left_lower_arm);



  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = -1; // relative to the lower arm
  this.left_hand.position.y = -5;

  this.left_lower_arm.add(this.left_hand);



  // TODO right arm
  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.x = -10; // relative to the neck
  this.right_upper_arm.position.y = -5;

  this.neck.add(this.right_upper_arm);



  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.x = -10; // relative to the upper arm
  this.right_lower_arm.position.y = -15;

  this.right_upper_arm.add(this.right_lower_arm);



  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = 1; // relative to the lower arm
  this.right_hand.position.y = -5;

  this.right_lower_arm.add(this.right_hand);

  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.x = 30; // relative to the lower arm
  this.left_upper_leg.position.y = -15;

  this.torso.add(this.left_upper_leg); 

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.x = 0;
  this.left_lower_leg.position.y = -15;

  this.left_upper_leg.add(this.left_lower_leg)

  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 10;
  this.left_foot.position.y = 0;

  this.left_lower_leg.add(this.left_foot)

  // TODO right leg
  this.right_upper_leg = new THREE.Bone();
  this.right_upper_leg.position.x = -30; // relative to the lower arm
  this.right_upper_leg.position.y = 15;

  this.torso.add(this.right_upper_leg); 

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.x = 0;
  this.right_lower_leg.position.y = -15;

  this.right_upper_leg.add(this.right_lower_leg)

  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -10;
  this.right_foot.position.y = 0;

  this.right_lower_leg.add(this.right_foot)


  // this will control which animation to run
  this.movement = null; // for instance 'raise left arm', 
                        // raises the left arm


};

Robot.prototype.show = function(scene) {

  rGroup = new THREE.Group();
  rGroup.add(r.head);

  scene.add(rGroup);

  helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3;

  scene.add(helper);

};

Robot.prototype.raiseLeftArm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.onAnimate = function() {

  // gets called on each animate loop
  // meaning on every frame

  // check which movement is requested
  if( this.movement == 'raise left arm') {

    // raise the left arm
    T=Math.PI;
    var x = Math.sin(T/2)
    var y = 0
    var z = 0
    var w = Math.cos(T/2)    

    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                          x,
                                          y,
                                          z,
                                          w
      ), 0.1 );


  } else if( this.movement == 'lower left arm') {

	  T=Math.PI;
	    var x = Math.sin(T/2)
	    var y = 0
	    var z = 0
	    var w = Math.cos(T/2)    

	    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
	                                          x,
	                                          y,
	                                          z,
	                                          w
	      ), 0.1 );


  } else if( this.movement == 'kick') {

  	T=Math.PI;
	    var x = Math.sin(T/2)
	    var y = 0
	    var z = 0
	    var w = Math.cos(T/2)    

	    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
	                                          x,
	                                          y,
	                                          z,
	                                          w
	      ), 1 );
  } 

	};