Robot = function(x, y, z) {

    // create head, neck, and torso
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.root = bones[0];
    this.root.position.set(x, y, z);

    this.head = bones[1];
    this.neck = bones[2];
    this.neck.position.y = -10;
    this.torso = bones[3];
    this.torso.position.y = -30;

    this.body_mesh = mesh;

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);

    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.x = 5;
    this.left_upper_arm.position.y = -5;

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -15;

    this.left_hand = bones[3];
    this.left_hand.position.x = 5;
    this.left_hand.position.y = -5;

    this.left_arm_mesh = mesh;

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);

    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.x = -5;
    this.right_upper_arm.position.y = -5;

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -15;

    this.right_hand = bones[3];
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;

    this.right_arm_mesh = mesh;
    //left leg

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);

    this.left_upper_leg = bones[ 1 ];
    this.left_upper_leg.position.x = 5;
    this.left_upper_leg.position.y = -5;

    this.left_lower_leg = bones[ 2 ];
    this.left_lower_leg.position.x = 5;
    this.left_lower_leg.position.y = -15;

    this.left_feet = bones[3];
    this.left_feet.position.x = 5;
    this.left_feet.position.y = -5;

    this.left_leg_mesh = mesh;

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]); // invisible anchor point

    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.x = -5;
    this.right_upper_leg.position.y = -5;

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.x = -5;
    this.right_lower_leg.position.y = -15;

    this.right_feet = bones[3];
    this.right_feet.position.x = -5;
    this.right_feet.position.y = -5;

    this.right_leg_mesh = mesh;


    this.movement = null;

  };

Robot.prototype.show = function(scene) {
    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_leg_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
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

      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                Math.sin(T/2),
                                0,
                                0,
                                Math.cos(T/2)),
                                0.1);
      }

    else if (this.movement == 'lower left arm') {
        // lower the left arm using the identity quaternion
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, -1 ), 0.1 );
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

          this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
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
    else if (this.movement == 'dance') {
      step = 5;
      if (this.head.position.y > -20) {
        this.head.position.y -= step;
      }
      if(this.left_upper_arm.quaternion.w < .01){
        this.movement = 'dance2'
      }
      else {
        T = -Math.PI/2;
        this.torso.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                          0, Math.cos(T/2)), 0.5 );
        T = Math.PI/2;
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.5 );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                    0, Math.cos(T/2)), 0.5 );
        T = -Math.PI;
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                   0,  Math.cos(T/2)), 0.5 );
        this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(0,  Math.sin(T/2),
                                                                   0,  Math.cos(T/2)), 0.5 );
        this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                    0, 1), 0.5 );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                    0, 1), 0.5 );
      }
    }
    else if (this.movement == 'dance2'){
      if(this.right_upper_arm.quaternion.w < .01){
        this.movement = 'dance'
      }
      else {
        T = -Math.PI;
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.1 );
        this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.1 );
        this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(0, Math.sin(T/2),
                                                                    Math.cos(T/2)), 0.1 );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                    0, Math.cos(T/2)), 0.1 );
        T = Math.PI/2;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.1 );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                    0, Math.cos(T/2)), 0.1 );

      }

    }
};