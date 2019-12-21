#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
uniform sampler2D u_data; 
uniform sampler2D u_velocity;
uniform float u_deltaTime;
// 'uniform vec2 u_resolution;
varying vec2 v_TexCoord;
void main() {

    float velocity_x = texture2D(u_velocity, v_TexCoord).r * 65536. + texture2D(u_velocity, v_TexCoord).g * 256.;
    float velocity_y = texture2D(u_velocity, v_TexCoord).b * 65536. + texture2D(u_velocity, v_TexCoord).a * 256.;

    velocity_x = floor(velocity_x * 2. / (65536.)) - 1.;
    velocity_y = floor(velocity_y * 2. / (65536.)) - 1.; 


    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);
    gl_FragColor = texture2D(u_data, v_TexCoord - vec2(velocity_x, velocity_y) * u_deltaTime);

    // vec2 coord = (v_TexCoord - vec2(0.5, 0.5))*4.;
    // float x = 0.;
    // float y = 0.;
    // float x1 = coord.x;
    // float y1 = coord.y;

    // gl_FragColor = vec4(0.,0.,0.,1.);
    // for (int i = 0; i < 1000; i++){
    //     if ((x*x + y*y) >= 4.){
    //         float i_f = float(i);
    //         gl_FragColor = vec4(0.,0.,1.,1.)*(1. - (i_f / 20.));
    //         break;
    //     }
    //     else {
    //         x1 = x*x - y*y;
    //         y1 = 2.*x*y;

    //         x = x1 + coord.x;
    //         y = y1 + coord.y;
    //     }   
    // }
}