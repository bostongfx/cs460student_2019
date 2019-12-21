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

    float angle = texture2D(u_velocity, v_TexCoord).r * 2. * PI;
    float magnitude = texture2D(u_velocity, v_TexCoord).a;
    float velocity_x = magnitude * cos(angle);
    float velocity_y = magnitude * sin(angle);

    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);
    gl_FragColor = texture2D(u_data, v_TexCoord - vec2(velocity_x, velocity_y) * u_deltaTime);
    }