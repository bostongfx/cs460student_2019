#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
// uniform sampler2D u_data; 
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform float u_deltaTime;
uniform vec2 u_inverseResolution;

varying vec2 v_TexCoord;

const vec4 bitSh = vec4(256. * 256. * 256., 256. * 256., 256., 1.);
const vec4 bitMsk = vec4(0.,vec3(1./256.0));
const vec4 bitShifts = vec4(1.) / bitSh;

vec4 pack (float value) {
    vec4 comp = fract(value * bitSh);
    comp -= comp.xxyz * bitMsk;
    return comp;
}

float unpack (vec4 color) {
    return dot(color , bitShifts);
}

const float rangeMin = -5.;
const float rangeMax = 5.;

vec4 convertFromRangeToColor(float value) {
   float zeroToOne = (value - rangeMin) / (rangeMax - rangeMin);
   return pack(value);
}

float convertFromColorToRange(vec4 color) {
   float zeroToOne = unpack(color);
   return rangeMin + zeroToOne * (rangeMax - rangeMin);
}

void main() {

    float velocity_x = texture2D(u_velocity, v_TexCoord).r * 65536. + texture2D(u_velocity, v_TexCoord).g * 256.;
    float velocity_y = texture2D(u_velocity, v_TexCoord).b * 65536. + texture2D(u_velocity, v_TexCoord).a * 256.;

    velocity_x = floor(velocity_x * 2. / (65536.)) - 1.;
    velocity_y = floor(velocity_y * 2. / (65536.)) - 1.; 

    float pressure_east = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(u_inverseResolution.x, 0.)));
    float pressure_west = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(-u_inverseResolution.x, 0.)));

    float pressure_north = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., u_inverseResolution.y)));
    float pressure_south = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., -u_inverseResolution.y)));

    velocity_x = (u_deltaTime / 2.) * (pressure_east - pressure_west);
    velocity_y = (u_deltaTime / 2.) * (pressure_north - pressure_south);

    velocity_x = floor (velocity_x * 65536.);
    velocity_y = floor (velocity_y * 65536.);


    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);
    gl_FragColor = vec4(velocity_x / 256., mod(velocity_x, 256.), velocity_y / 256., mod(velocity_y, 256.)) / 256.;

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