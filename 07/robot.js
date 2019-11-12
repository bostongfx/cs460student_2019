Robot = function(x, y, z) {

<<<<<<< HEAD
  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;
  // end of head, neck, tors


   // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.x = 5;
  this.left_upperarm.position.y = -5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.x = 5;
  this.left_lowerarm.position.y = -15;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  this.leftarm_mesh = mesh;
  //end of left arm

  // start of right arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.right_upperarm = bones[ 1 ];
  this.right_upperarm.position.x = -5;
  this.right_upperarm.position.y = -5;

  this.right_lowerarm = bones[ 2 ];
  this.right_lowerarm.position.x = -5;
  this.right_lowerarm.position.y = -15;

  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.rightarm_mesh = mesh;
  //end of right arm


   // start of left leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.left_upperleg = bones[ 1 ];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[ 2 ];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;

  this.leftleg_mesh = mesh;
  //end of left leg

  // start of right leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.right_upperleg = bones[ 1 ];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[ 2 ];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.rightleg_mesh = mesh;
  //end of right leg


  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

  // ToDo: add other body part meshes
=======
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y; 
	this.head.position.z = z;

	this.neck = new THREE.Bone();
	this.neck.position.y = -10;  // relative to the head
	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;  // relative to the neck
	this.neck.add(this.torso);

	// left arm
	//
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.x = 10;  // relative to the neck
	this.left_upper_arm.position.y = -5;
	this.neck.add(this.left_upper_arm);

	this.left_lower_arm = new THREE.Bone();;
	this.left_lower_arm.position.x = 10;  // relative to the upper arm
	this.left_lower_arm.position.y = -15;
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.x = -1;  // relative to the lower arm
	this.left_hand.position.y = -5;
	this.left_lower_arm.add(this.left_hand);

	// right arm
	//
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.x = -10;  
	this.right_upper_arm.position.y = -5;
	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();;
	this.right_lower_arm.position.x = -10; 
	this.right_lower_arm.position.y = -15;
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.x = 1;  
	this.right_hand.position.y = -5;
	this.right_lower_arm.add(this.right_hand);

	// left leg
	//
	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 8;  // relative to the torso
	this.left_upper_leg.position.y = -8;
	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();;
	this.left_lower_leg.position.x = 5;  // relative to the upper leg
	this.left_lower_leg.position.y = -15;
	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone(); 
	this.left_foot.position.y = -5;  // relative to the lower leg
	this.left_lower_leg.add(this.left_foot);

	// right leg
	//
	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.x = -8;  // relative to the torso
	this.right_upper_leg.position.y = -8;
	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();;
	this.right_lower_leg.position.x = -5;  // relative to the upper leg
	this.right_lower_leg.position.y = -15;
	this.right_upper_leg.add(this.right_lower_leg);

	this.right_foot = new THREE.Bone(); 
	this.right_foot.position.y = -5;  // relative to the lower leg
	this.right_lower_leg.add(this.right_foot);

	this.left_upper_leg = null;

	this.left_lower_leg = null;

	this.left_foot = null;

	//ToDo: right leg

	// this will control which animation to run
  	this.movement = null; // for instance 'raise left arm', 
                        // raises the left arm



};

Robot.prototype.show = function(scene) {

	rGroup = new THREE.Group();
	rGroup.add(r.head);
	scene.add(rGroup);

	helper = new THREE.SkeletonHelper( rGroup );
	scene.add(helper);
>>>>>>> ef6a2b709506420b6b3aa7c7f455a3959e70b982

};

Robot.prototype.raise_left_arm = function() {
<<<<<<< HEAD

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

=======
	this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
};

Robot.prototype.kick = function(){
	this.movement = 'kick';
};

Robot.prototype.dance = function() {
	this.movement = 'dance';
>>>>>>> ef6a2b709506420b6b3aa7c7f455a3959e70b982
};

Robot.prototype.onAnimate = function() {

<<<<<<< HEAD
  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.root.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};
=======
	// gets called on each animate loop
	// meaning on every frame

	// check which movement is requested
	if (this.movement == 'raise left arm' ) {
		// raise the left arm
		T = -Math.PI;
		this.left_upper_arm.quaternion.slerp( 
			new THREE.Quaternion(
				Math.sin(T/2),
				0,
				0,
				Math.cos(T/2) ), 0.1);


	} else if (this.movement == 'lower left arm')  {
		// lower the left arm
		this.left_upper_arm.quaternion.slerp( 
			new THREE.Quaternion(0, 0, 0, 1), 0.1 );


	} else if (this.movement == 'kick' ) {
		if (this.right_upper_leg.quaternion.w < 0.72) {
			this.movement = 'kick done';
		} else {
			T = Math.PI;
			this.right_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
					Math.sin(T/2),
					0,
					0,
					Math.cos( T/2 )), 0.1 );
		}
	} else if (this.movement == 'kick done') {
		this.right_upper_leg.quaternion.slerp( 
			new THREE.Quaternion(0, 0, 0, 1), 0.1 );


	} else if (this.movement == 'dance') {

		if (this.left_upper_arm.quaternion.w < 0.72) {
			this.movement = 'state1';
		} else {
			T = Math.PI;
			this.left_upper_arm.quaternion.slerp(
				new THREE.Quaternion(
					Math.sin(T/2),
					0,
					0,
					Math.cos( T/2 )), 0.1 );
		}

	} else if (this.movement == 'state1') {
		this.left_upper_arm.quaternion.slerp( 
			new THREE.Quaternion(0, 0, 0, 1), 0.1 );
		this.movement = 'state2';

	}
}




>>>>>>> ef6a2b709506420b6b3aa7c7f455a3959e70b982
