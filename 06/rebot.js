Robot=function(){
	this.head=new Three.bone();

	this.neck=new Three.bone();

	this.head.add(this.neck);
	
	this.torse=new Three.bone();

	this.neck.add(torse);
	
	this.left_upper_arm=null;
	
	this.left_lower_arm=null;
	
	this.left_hand=null;
	
	this.left_upper_log=null;

	this.left_lower_log=null;

	this.left_log=null;


}