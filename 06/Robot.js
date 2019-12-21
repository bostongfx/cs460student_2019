Robot = function(x, y, z){
    this.head = new THREE.Bone();
    // this.head.position.x = x;
    // this.head.position.y = y;
    // this.head.position.z = z;
    this.head.position.set(x, y, z);

    this.neck = new THREE.Bone();
    this.neck.position.y = -10;                     //relative to head

    this.head.add(this.neck);

    this.torso = new THREE.Bone();
    this.torso.position.y = -20;

    this.neck.add(this.torso);

    // TODO left arm

    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 10;                     //relative to arm
    this.left_upper_arm.position.y = -5;

    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone();         //relatvie to upper arm
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -5;

    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = 5;
    this.left_hand.position.y = -2.5;

    this.left_lower_arm.add(this.left_hand);

    // TODO right arm

    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -10;
    this.right_upper_arm.position.y = -5;

    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -5;

    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -2.5;

    this.right_lower_arm.add(this.right_hand);

    // TODO left leg

    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 10;
    this.left_upper_leg.position.y = -10;

    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.x = 5;
    this.left_lower_leg.position.y = -10;

    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -5;

    this.left_lower_leg.add(this.left_foot);

    // TODO right leg

    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -10;
    this.right_upper_leg.position.y = -10;

    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -5;
    this.right_lower_leg.position.y = -10;

    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;

    this.right_lower_leg.add(this.right_foot);

    //this will control which animation to run
    this.movement = null;   //raise left arm
}

Robot.prototype.show = function(scene){
    var rGroup = new THREE.Group();
    rGroup.add(this.head);

    var helper = new THREE.SkeletonHelper(rGroup);
    helper.material.linewidth = 3;  //make the skeleton thick

    scene.add(rGroup);
    scene.add(helper);
}

Robot.prototype.raise_left_arm = function(){
    this.movement = 'raise left arm';
}

Robot.prototype.lower_left_arm = function(){
    this.movement = 'lower left arm';
}

Robot.prototype.kick = function(){
    this.movement = 'kick';
    
}

Robot.prototype.dance = function(){
    this.movement = 'dance';
}

Robot.prototype.stop = function(){
    this.movement = 'null';
}

Robot.prototype.onAnimate = function(){
    // gets called on each animate loop
    // meaning on every frame

    //check which movement is requested
    if (this.movement == 'raise left arm'){

        //raise the left arm
        T = Math.PI;
        this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(T/2),
                                                                0, 
                                                                0, 
                                                                Math.cos(T/2)), 0.1);
    }else if(this.movement == 'lower left arm'){
        T = -Math.PI;
        this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.cos(T/2),
                                                                0, 
                                                                0, 
                                                                Math.sin(T/2)), 0.1);
    }else if(this.movement == 'kick'){
    
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
    }else if (this.movement == 'kick done') {
  
        // reset leg back to identity
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    
    }else if (this.movement == 'dance'){            //bonus part 2 begin

        zT = Math.PI;
        fT = Math.PI;
        this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(zT/2), 
                                                                0, 
                                                                0, 
                                                                Math.cos(zT/2)), 0.2);
        this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 
                                                                Math.sin(zT/2), 
                                                                0, 
                                                                Math.cos(zT/2)), 0.3);
        this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(zT/2), 
                                                                0, 
                                                                0, 
                                                                Math.cos(zT/2)), 0.4);
        this.right_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 
                                                                Math.sin(zT/2), 
                                                                0, 
                                                                Math.cos(zT/2)), 0.5);
        this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(zT/2), 
                                                                0, 
                                                                0, 
                                                                Math.cos(zT/2)), 0.4);
        this.left_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 
                                                                Math.sin(zT/2), 
                                                                0, 
                                                                Math.cos(zT/2)), 0.3);
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(zT/2), 
                                                                0, 
                                                                0, 
                                                                Math.cos(zT/2)), 0.2);
        this.right_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 
                                                                Math.sin(zT/2), 
                                                                0, 
                                                                Math.cos(zT/2)), 0.1);
        this.movement = 'return';
    }else if(this.movement == 'return'){

        //call to the identity quaternion
        this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.right_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);

        this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.left_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        this.right_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.5);
        
        this.movement = 'dance';

    }else if(this.movement == 'null'){
        return;
    }
}