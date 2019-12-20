Platform = function(x_pos, y_pos){
	this.platform_geometry = new THREE.BoxGeometry(7, 80, 8);
	this.platform_material = new THREE.MeshStandardMaterial({color: "black"});
	this.platform = new THREE.Mesh(this.platform_geometry, this.platform_material);
	this.platform.position.y = y_pos;
	this.platform.position.x = x_pos;
	this.platform_x_velocity = 0.01;
    scene.add(this.platform);








}