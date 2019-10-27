Robot = function(x,y,z){
    //head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;




    //neck
    this.neck = new THREE.Bone();
    this.head.add(this.neck);
    this.neck.position.y = -10;




    //torso
    this.torso = new THREE.Bone();
    this.neck.add(this.torso);
    this.torso.position.y = -30;




    //left arm stuff
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 10;
    this.left_upper_arm.position.y = -5
    this.neck.add(this.left_upper_arm);





    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -20;
    this.left_upper_arm.add(this.left_lower_arm);





    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = -1;
    this.left_hand.position.y = -5;
    this.left_lower_arm.add(this.left_hand);




    //right arm stuff
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -10;
    this.right_upper_arm.position.y = -5
    this.neck.add(this.right_upper_arm);





    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -20;
    this.right_upper_arm.add(this.right_lower_arm);





    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = 1;
    this.right_hand.position.y = -5;
    this.right_lower_arm.add(this.right_hand);





    // left leg stuff
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 5;
    this.left_upper_leg.position.y = -5;
    this.torso.add(this.left_upper_leg);





    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.x = 2;
    this.left_lower_leg.position.y = -20;
    this.left_upper_leg.add(this.left_lower_leg);





    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -1   ;
    this.left_lower_leg.add(this.left_foot);





    // right leg stuff
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -5;
    this.right_upper_leg.position.y = -5;
    this.torso.add(this.right_upper_leg);





    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -2;
    this.right_lower_leg.position.y = -20;
    this.right_upper_leg.add(this.right_lower_leg);





    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -1   ;
    this.right_lower_leg.add(this.right_foot);






    this.movement = null; //control with animation to run

    // TODO right leg
    Robot.prototype.show = function(scene){
        rGroup = new THREE.Group();
        rGroup.add(r.head);

        scene.add(rGroup);
        helper = new THREE.SkeletonHelper(rGroup);

        scene.add(helper);
      }

    Robot.prototype.raiseLeftArm = function() {
        this.movement = 'raise left arm';
    }
    Robot.prototype.lowerLeftArm = function() {
        this.movement = 'lower left arm';
    }

    var kicking;
    Robot.prototype.kick = function() {
        this.movement = 'kick';
        kicking = true; 
    };


    Robot.prototype.onAnimate = function(){
        //called every frame
        
        if (this.movement == 'raise left arm'){
            
            var T = Math.PI;
            var x = Math.sin(T/2)*1;
            var y = Math.sin(T/2)*0;
            var z = Math.sin(T/2)*0;
            var w = Math.cos(T/2);

            this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(x,y,z,w), 0.05);
        }
        else if (this.movement == 'lower left arm'){
            
            var T = 0;
            var x = Math.sin(T/2)*1;
            var y = Math.sin(T/2)*0;
            var z = Math.sin(T/2)*0;
            var w = Math.cos(T/2);

            this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(x,y,z,w), 0.05);
        }
        else if(this.movement == 'kick'){

            var T = Math.PI / 2;
            var x = Math.sin(T/2)*1;
            var y = Math.sin(T/2)*0;
            var z = Math.sin(T/2)*0;
            var w = Math.cos(T/2);

            if (kicking){
                this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(x,y,z,w), 0.05);   
                if (this.left_upper_leg.quaternion.angleTo(new THREE.Quaternion(x,y,z,w)) < 0.3){
                    kicking = false;
                }            
            }
            else{
                var T = 0;
                var x = Math.sin(T/2)*1;
                var y = Math.sin(T/2)*0;
                var z = Math.sin(T/2)*0;
                var w = Math.cos(T/2);
                this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(x,y,z,w), 0.05);
            }
        }
    }

    
    
    
};