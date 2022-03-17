
// 片元着色器
precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main(){
    // 取样器 * 纹理坐标
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}