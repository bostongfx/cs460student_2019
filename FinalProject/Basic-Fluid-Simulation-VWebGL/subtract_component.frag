#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538 
// uniform sampler2D u_data; 
uniform sampler2D u_velocity_component;
uniform int u_component;
// uniform sampler2D u_velocity_y;
uniform sampler2D u_pressure;
uniform float u_deltaTime;
uniform float u_density;
uniform vec2 u_inverseResolution;

varying vec2 v_TexCoord;


// rgba-float conversion ___
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
//____


void main() {

    // convert velocity component (either x or y depending on whats passed in) to a float instead of color
    float velocity_component = convertFromColorToRange(texture2D(u_velocity_component, v_TexCoord));


    // if x component
    if (u_component == 0){
        // subtract pressure from velocity
        float pressure_east = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(u_inverseResolution.x, 0.)));
        float pressure_west = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(-u_inverseResolution.x, 0.)));
        velocity_component = velocity_component - (u_deltaTime / (2.* u_density)) * (pressure_east - pressure_west);
    }
     // if y component
    else{
        // subtract pressure from velocity
        float pressure_north = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., u_inverseResolution.y)));
        float pressure_south = convertFromColorToRange(texture2D(u_pressure, v_TexCoord + vec2(0., -u_inverseResolution.y)));
        velocity_component = velocity_component - (u_deltaTime / (2.* u_density)) * (pressure_north - pressure_south);
    }

    // convert velocity to a color and return
    gl_FragColor = convertFromRangeToColor(velocity_component);
}