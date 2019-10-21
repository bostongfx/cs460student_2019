Robot = function() {

this.head = new THREE.Bone();
this.head.position.y = -55;

this.neck = new THREE.Bone();
this.neck.position.y = -10;

this.head.add(this.neck);

this.torso = new THREE.Bone();
this.torso.position.y = -10;

this.neck.add(this.torso);

this.left_upper_arm = new THREE.Bone();
this.left_upper_arm.position.x = 10;

this.left_lower_arm = null;


this.left_hand = null;

// TODO right arm

this.left_upper_leg = null;

this.left_lower_leg = null;

this.left_foot = null;

// TODO right leg

};