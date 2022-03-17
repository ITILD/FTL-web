
// 片元着色器
precision mediump float;// 着色器精度
uniform sampler2D u_Sampler;// 取样器
varying vec2 v_TexCoord;
varying float v_NdotL;

void main(){

    vec4 color = texture2D(u_Sampler, v_TexCoord);
    gl_FragColor = vec4(color.rgb * v_NdotL, color.a);

}
