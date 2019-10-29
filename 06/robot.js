Robot = function(x, y, z) {

	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
    this.head.position.z = z;

	this.neck = new THREE.Bone();
    this.neck.position.y = -10;

	this.head.add(this.neck)

	this.torso = new THREE.Bone();
    this.torso.position.y = -30

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
	this.left_hand.position.x = -1;
    this.left_hand.position.y = -5;

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
	this.right_hand.position.x = 1;
    this.right_hand.position.y = -5;

	this.right_lower_arm.add(this.right_hand);

	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 5;
    this.left_upper_leg.position.y = -5;

	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.x = 5;
    this.left_lower_leg.position.y = -25;

	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 3;

	this.left_lower_leg.add(this.left_foot);

	this.right_upper_leg =new THREE.Bone();
	this.right_upper_leg.position.x = -5;
    this.right_upper_leg.position.y = -5;

	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.x = -5;
    this.right_lower_leg.position.y = -25;

	this.right_upper_leg.add(this.right_lower_leg);

	this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -3;

	this.right_lower_leg.add(this.right_foot);
}

Robot.prototype.show = function(scene) {

    rGroup = new THREE.Group();
    rGroup.add(this.head);

    scene.add(rGroup);

    helper = new THREE.SkeletonHelper(rGroup);
    helper.material.linewidth = 3;

    scene.add(helper);

  };

  Robot.prototype.raiseLeftArm = function() {

    this.movement = 'raise left arm';

  };

  Robot.prototype.lowerLeftArm = function() {

    this.movement = 'lower left arm';

  };

  Robot.prototype.kick = function() {

    this.movement = 'kick';

  };


  Robot.prototype.onAnimate = function() {

    // gets called on each animate loop
    // meaning on every frame

    // check which movement is requested
    if (this.movement == 'raise left arm') {

      // raise the left arm
      T = -Math.PI;

      r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                Math.sin(T/2),
                                0,
                                0,
                                Math.cos(T/2)),
                                0.1);
      }

    else if (this.movement == 'lower left arm') {
        // lower the left arm using the identity quaternion
        r.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, -1 ), 0.1 );
    }

    else if (this.movement == 'kick') {
        // animate a right kick
        // check if the slerp has almost reached its end
        if (this.right_upper_leg.quaternion.w < 0.90) {
            // signal that the kick is done and the leg should move back
            this.movement = 'kick done';
        }

        else {
          // forward kick with the right leg
          T = Math.PI/3;

          r.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                    Math.sin( T/2 ),
                                    0,
                                    0,
                                    -Math.cos( T/2 )),
                                    0.1);
          }
    }

    else if (this.movement == 'kick done') {
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1 ), 0.1 );
    }
};