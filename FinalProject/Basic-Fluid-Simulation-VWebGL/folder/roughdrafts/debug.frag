#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
#define TWO_PI 6.28318530718
// uniform sampler2D u_data; 
uniform sampler2D u_velocity;
// uniform float u_deltaTime;
// 'uniform vec2 u_resolution;
varying vec2 v_TexCoord;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {

    // float angle = texture2D(u_velocity, v_TexCoord).r * 2. * PI;
    // float magnitude = texture2D(u_velocity, v_TexCoord).a;
    // float velocity_x = magnitude * cos(angle);
    // float velocity_y = magnitude * sin(angle);
    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-v_TexCoord;
    // float angle = atan(toCenter.y,toCenter.x);
    float angle = texture2D(u_velocity, v_TexCoord).r;
    // float magn = length(toCenter)*2.0;
    float magn = texture2D(u_velocity, v_TexCoord).a;

    // float velocity_x = texture2D(u_velocity, v_TexCoord).r * 65536. + texture2D(u_velocity, v_TexCoord).g * 256.;
    // float velocity_y = texture2D(u_velocity, v_TexCoord).b * 65536. + texture2D(u_velocity, v_TexCoord).a * 256.;

    // velocity_x = floor(velocity_x * 2. / (65536.)) - 1.;
    // velocity_y = floor(velocity_y * 2. / (65536.)) - 1.; 

    // float angle = atan( velocity_y, velocity_x) + PI;
    // float magn = sqrt(velocity_x*velocity_x + velocity_y*velocity_y);
    // float magn = 1.;
    // angle is color, radius is saturation
    vec3 color = hsb2rgb(vec3((angle)+0.5,magn,1.0));

    gl_FragColor = vec4(color, 1.);
    }