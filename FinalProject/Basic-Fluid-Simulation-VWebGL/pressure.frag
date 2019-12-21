#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
// uniform sampler2D u_data; 
// uniform sampler2D u_velocity;
// uniform float u_deltaTime;
uniform vec2 u_inverseResolution;
uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
// 'uniform vec2 u_resolution;
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
   return pack(zeroToOne);
}

float convertFromColorToRange(vec4 color) {
   float zeroToOne = unpack(color);
   return rangeMin + zeroToOne * (rangeMax - rangeMin);
}

void main() {

    // float velocity_x = texture2D(u_velocity, v_TexCoord).r * 65536. + texture2D(u_velocity, v_TexCoord).g * 256.;
    // float velocity_y = texture2D(u_velocity, v_TexCoord).b * 65536. + texture2D(u_velocity, v_TexCoord).a * 256.;

    // velocity_x = floor(velocity_x * 2. / (65536.)) - 1.;
    // velocity_y = floor(velocity_y * 2. / (65536.)) - 1.; 


    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);

    float divergence = convertFromColorToRange(texture2D(u_divergence, v_TexCoord));
    float pressure_north = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., 2.*u_inverseResolution.y)));
    float pressure_south = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., -2.*u_inverseResolution.y)));
    float pressure_east = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(2.*u_inverseResolution.x, 0.)));
    float pressure_west = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(-2.*u_inverseResolution.x, 0.)));

    gl_FragColor = convertFromRangeToColor((divergence + pressure_north + pressure_south + pressure_east + pressure_west) / 4.);

}