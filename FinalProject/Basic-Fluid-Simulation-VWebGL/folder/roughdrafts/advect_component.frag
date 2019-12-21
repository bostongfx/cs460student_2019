#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
uniform sampler2D u_data; 
uniform sampler2D u_velocity_x;
uniform sampler2D u_velocity_y;
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
   return pack(zeroToOne);
}

float convertFromColorToRange(vec4 color) {
   float zeroToOne = unpack(color);
   return rangeMin + zeroToOne * (rangeMax - rangeMin);
}

void main() {

    // float velocity_x = texture2D(u_velocity, v_TexCoord).r * 65536. + texture2D(u_velocity, v_TexCoord).g * 256.;
    // float velocity_y = texture2D(u_velocity, v_TexCoord).b * 65536. + texture2D(u_velocity, v_TexCoord).a * 256.;

    float velocity_x = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord));
    float velocity_y = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord));


    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);
    gl_FragColor = texture2D(u_data, v_TexCoord - vec2(velocity_x, velocity_y) * u_deltaTime * u_inverseResolution);
}