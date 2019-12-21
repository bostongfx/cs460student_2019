


Robot = function(x, y, z){
    
    this.head = new THREE.Bone ();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.Bone ();
    this.neck.position.y = -10; // relative to head

    this.head.add(this.neck); //neck is child from head

    this.torso = new THREE.Bone ();
    this.torso.position.y = -30;

    this.neck.add(this.torso);


    // left arm

    this.left_upper_arm = new THREE.Bone ();
    this.left_upper_arm.position.y = -10;
    this.left_upper_arm.position.x = 10;

    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone ();
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 10;

    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone ();
    this.left_hand.position.y = -5;
    this.left_hand.position.x = 5;

    this.left_lower_arm.add(this.left_hand);

    // right arm

    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -10;
    this.right_upper_arm.position.x = -10;

    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone ();
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -10;

    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone ();
    this.right_hand.position.y = -5;
    this.right_hand.position.x = -5;

    this.right_lower_arm.add(this.right_hand);

    // left leg

    this.left_upper_leg = new THREE.Bone ();
    this.left_upper_leg.position.y = -30;
    this.left_upper_leg.position.x = 10;
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone ();
    this.left_lower_leg.position.y = -20;
    this.left_lower_leg.position.x = 0;
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone ();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 10;
    this.left_lower_leg.add(this.left_foot);

    // right leg 

    this.right_upper_leg = new THREE.Bone ();
    this.right_upper_leg.position.y = -30;
    this.right_upper_leg.position.x = -10;
    this.torso.add(this.right_upper_leg)

    this.right_lower_leg = new THREE.Bone ();
    this.right_lower_leg.position.y = -20;
    this.right_lower_leg.position.x = 0;
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone ();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -10;
    this.right_lower_leg.add(this.right_foot);

    // control mvement animation
    this.movement = null; //raise left arm
};

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
  };

  Robot.prototype.raise_right_arm = function() {
    this.movement = 'raise right arm';
  };
  
  Robot.prototype.lower_left_arm = function() {
    this.movement = 'lower left arm';
  };

  Robot.prototype.lower_right_arm = function() {
    this.movement = 'lower right arm';
  };
  
  Robot.prototype.kick = function() {
    this.movement = 'kick';
  };

  Robot.prototype.dance = function() {
      var that = this;
      setInterval(function() {
        var random = Math.floor(Math.random() * 5);
        switch(random) {
        case 0:
            that.raise_left_arm();
            break;
        case 1:
            that.lower_left_arm();
            break;
        case 2:
            that.raise_right_arm();
            break;
        case 3:
            that.lower_right_arm();
            break;
        case 4:
            that.kick();
            break;
        }
      }, 150);
  };
  
  Robot.prototype.onAnimate = function() {
    if (this.movement == 'raise left arm') {
        var T = -Math.PI;
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                                  0,               // y
                                                                  0,               // z
                                                                  Math.cos(T/2)),  // w
                                            0.1 );
    } else if (this.movement == 'lower left arm') {
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                                  0,               // y
                                                                  0,               // z
                                                                  0),  // w
                                            0.1 );
    } else if (this.movement == 'raise right arm') {
        var T = -Math.PI;
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                                  0,               // y
                                                                  0,               // z
                                                                  Math.cos(T/2)),  // w
                                            0.1 );
    } else if (this.movement == 'lower right arm') {
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                                  0,               // y
                                                                  0,               // z
                                                                  0),  // w
                                            0.1 );
    } else if (this.movement == 'kick') {
    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72) {
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