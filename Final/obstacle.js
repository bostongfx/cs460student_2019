Obstacle = function(obstacle_pos_x, obstacle_pos_y){
		this.obstacle_geometry = new THREE.ConeGeometry(3, 6);
        this.obstacle_material = new THREE.MeshStandardMaterial({color: "black",
                                                            side: THREE.FrontSide });
        this.obstacle = new THREE.Mesh(this.obstacle_geometry, this.obstacle_material );
        this.obstacle.position.y = obstacle_pos_y;
        this.obstacle.position.x = obstacle_pos_x;
        this.obstacle_x_velocity = 0.01;

       this.outline = new THREE.Mesh(
        new THREE.ConeGeometry(3, 6),
        new THREE.MeshStandardMaterial({
            color: "white",
            side: THREE.BackSide
        })
        )
        this.outline.position.y = -46.1;
        this.outline.position.x = obstacle_pos_x;
        this.outline.position.y = obstacle_pos_y;
        this.outline_x_velocity = 0.01; 
        const s = 2;
        this.outline.scale.set(s,s,0);
        this.obstacle.scale.set(1, 1, .5)
        if(this.obstacle.position.y == 46.1){
        	this.obstacle.rotateX(Math.PI);
        	this.outline.rotateX(Math.PI);
        	this.outline.scale.set(1.5,1.5,0)
        }

        scene.add(this.obstacle);
        scene.add(this.outline);
}

// Obstacle.prototype.show = function(){
// 	scene.add(Obstacle)




// 	}