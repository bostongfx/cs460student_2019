export default `
attribute vec3 a_position;

    uniform vec3 u_offset;

    void main(void) {

      vec3 final_position = a_position;
      final_position.x += u_offset.x;
      final_position.y += u_offset.y;
      final_position.z += u_offset.z;
    
      gl_Position = vec4( final_position, 1.);
      gl_PointSize = 10.;
    
    }
    `;
