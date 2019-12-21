#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
// uniform sampler2D u_data; 
uniform sampler2D u_velocity_x;
uniform sampler2D u_velocity_y;
uniform float u_deltaTime;
uniform float u_density;
uniform vec2 u_inverseResolution;
// uniform vec2 u_resolution;
varying vec2 v_TexCoord;



// const vec4 bitSh = vec4(256. * 256. * 256., 256. * 256., 256., 1.);
// const vec4 bitMsk = vec4(0.,vec3(1./256.0));
// const vec4 bitShifts = vec4(1.) / bitSh;
// vec4 pack (float value) {
//     vec4 comp = fract(value * bitSh);
//     comp -= comp.xxyz * bitMsk;
//     return comp;
// }

// float unpack (vec4 color) {
//     return dot(color , bitShifts);
// }

// vec4 EncodeFloatRGBA( float v ) {
//   vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
//   enc = floor(enc);
//   enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
//   return enc;
// }
// float DecodeFloatRGBA( vec4 rgba ) {
//   return dot( rgba, vec4(1.0, 1./255.0, 1./65025.0, 1./16581375.0) );
// }

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

    float velocity_x = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord));
    float velocity_x_up = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord + vec2(0., u_inverseResolution.y)));
    float velocity_x_down = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord + vec2(0., -u_inverseResolution.y)));
    float velocity_x_right = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord + vec2(u_inverseResolution.x, 0.)));
    float velocity_x_left = convertFromColorToRange(texture2D(u_velocity_x, v_TexCoord + vec2(-u_inverseResolution.x, 0.)));

    float velocity_y = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord));
    float velocity_y_up = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord + vec2(0., u_inverseResolution.y)));
    float velocity_y_down = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord + vec2(0., -u_inverseResolution.y)));
    float velocity_y_right = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord + vec2(u_inverseResolution.x, 0.)));
    float velocity_y_left = convertFromColorToRange(texture2D(u_velocity_y, v_TexCoord + vec2(-u_inverseResolution.x, 0.)));

    

    // gl_FragColor = vec4(1, texture2D(u_data, v_TexCoord).r, texture2D(u_data, v_TexCoord).a, 1);
    // gl_FragColor = texture2D(u_data, v_TexCoord - vec2(velocity_x, velocity_y) * u_deltaTime);
    
    float divergence = -(2.* u_density) * (1. / u_deltaTime) * (velocity_x_up - velocity_x_down + velocity_y_right - velocity_y_left);

    gl_FragColor = convertFromRangeToColor(divergence);

}