Finish = function(){
	this.finish_geometry = new THREE.BoxGeometry(7, 20, 8);
	this.finish_material = new THREE.MeshStandardMaterial({color: "red"});
	this.finish = new THREE.Mesh(this.finish_geometry, this.finish_material);
	this.finish.position.y = -40.1;
	this.finish.position.x = 2700;
	
	this.finish_x_velocity = 0.01;
	scene.add(this.finish)
	this.finish2_geometry = new THREE.BoxGeometry(7, 20, 8);
	this.finish2_material = new THREE.MeshStandardMaterial({color: "white"});
	this.finish2 = new THREE.Mesh(this.finish2_geometry, this.finish2_material);
	this.finish2.position.y = -20.1;
	this.finish2.position.x = 2700;
	
	this.finish2_x_velocity = 0.01;
	scene.add(this.finish2)

	this.finish3_geometry = new THREE.BoxGeometry(7, 20, 8);
	this.finish3_material = new THREE.MeshStandardMaterial({color: "red"});
	this.finish3 = new THREE.Mesh(this.finish3_geometry, this.finish3_material);
	this.finish3.position.y = -0.1;
	this.finish3.position.x = 2700;
	
	this.finish3_x_velocity = 0.01;
	scene.add(this.finish3)

	this.finish4_geometry = new THREE.BoxGeometry(7, 20, 8);
	this.finish4_material = new THREE.MeshStandardMaterial({color: "white"});
	this.finish4 = new THREE.Mesh(this.finish4_geometry, this.finish4_material);
	this.finish4.position.y = 19.9;
	this.finish4.position.x = 2700;
	
	this.finish4_x_velocity = 0.01;
	scene.add(this.finish4)

	this.finish5_geometry = new THREE.BoxGeometry(7, 18, 8);
	this.finish5_material = new THREE.MeshStandardMaterial({color: "red"});
	this.finish5 = new THREE.Mesh(this.finish5_geometry, this.finish5_material);
	this.finish5.position.y = 38.9;
	this.finish5.position.x = 2700;
	
	this.finish5_x_velocity = 0.01;
	scene.add(this.finish5)
}