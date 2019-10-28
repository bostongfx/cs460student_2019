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



	this.movement = 'nothing'; 




};

Robot.prototype.show = function(){


	
        rGroup = new THREE.Group();
        rGroup.add(r.head)
       
        var helper = new THREE.SkeletonHelper(rGroup);
        helper.material.linewidth = 100;
         scene.add(rGroup);
        scene.add(helper);
};


Robot.prototype.raise_left_arm = function(){

	this.movement = 'raise left arm';
}

Robot.prototype.lower_left_arm = function(){

	this.movement = 'lower left arm'
}

Robot.prototype.raise_right_arm = function(){

	this.movement = 'raise right arm';
}

Robot.prototype.lower_right_arm = function(){

	this.movement = 'lower right arm'
}

Robot.prototype.right_kick = function(){

	this.movement = 'right kick'
}
Robot.prototype.left_kick = function(){

	this.movement = 'left kick'
}
Robot.prototype.dance = function(){
	this.movement = 'dance';
}



Robot.prototype.onAnimate = function(){

	if(this.movement == 'raise left arm'){


		T = Math.PI;
		var x = Math.sin(T/2)
		var y = 0
		var z = 0
		var w = Math.cos(T/2)
		 this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(x,   // x
                                                              y,               // y
                                                              z,               // z
                                                              w),  // w
                                        0.1 );

	}
	else if(this.movement == 'lower left arm'){

		 this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              1),  // w
                                        0.1 );
	}
	else if(this.movement == 'raise right arm'){


		T = Math.PI;
		var x = Math.sin(T/2)
		var y = 0
		var z = 0
		var w = Math.cos(T/2)
		 this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(x,   // x
                                                              y,               // y
                                                              z,               // z
                                                              w),  // w
                                        0.1 );

	}
	else if(this.movement == 'lower right arm'){

		 this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              1),  // w
                                        0.1 );
	}
	else if(this.movement == 'right kick'){
		if(this.right_upper_leg.quaternion.w < 0.72){
			this.movement = 'right kick done';
		}
		else{
			var T = -Math.PI/2;
			this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
		}



	}
	else if(this.movement == 'right kick done'){
		this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0,
															0,
															0,
															1),
											0.1);
	}
	else if(this.movement == 'left kick'){
		if(this.left_upper_leg.quaternion.w < 0.72){
			this.movement = 'left kick done';
		}
		else{
			var T = -Math.PI/2;
			this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
		}



	}
	else if(this.movement == 'left kick done'){
		this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0,
															0,
															0,
															1),
											0.1);

	}

	else if(this.movement == 'dance'){
		if(this.left_upper_leg.quaternion.w < 0.72){
			this.movement = 'reset';
		}
		else{
			var T = -Math.PI/2;
			this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
	var P = -Math.PI/3;
	this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0,
														Math.sin(P/2),
														0,
														Math.cos(P/2)),
											0.1);
	var S = 1.5 *Math.PI;
	this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(S/2),
														0,
														0,
														Math.cos(S/2)),
											0.1);

	var R = Math.PI;
	this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														Math.sin(R/2),
														Math.cos(R/2)),
											0.1);

		}
			
	}
	else if(this.movement == 'reset'){
		if(this.left_upper_arm.quaternion.z < .1){
			this.movement = 'dance';
		}
		else{
	this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);
	this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);

	this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,
														0,
														0,
														1),
											0.1);
	this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                        0,                   // y
                                                        0,                   // z
                                                        1), // w
                                            0.1 );
		}




	}

		



}
		 
