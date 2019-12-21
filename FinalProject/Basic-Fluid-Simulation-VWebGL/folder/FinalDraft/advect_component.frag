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


// rbga-float conversion ___
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
// ___

void main() {

    // velocity component floats
    float velocity_x = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord));
    float velocity_y = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord));

    // grab the velocity of the pixel which is in the opposite direction of my velocity in one time step
        // I am getting the velocity of myself backwards in time I guess
    gl_FragColor = texture2D(u_data, v_TexCoord - vec2(velocity_x, velocity_y) * u_deltaTime * u_inverseResolution);
}