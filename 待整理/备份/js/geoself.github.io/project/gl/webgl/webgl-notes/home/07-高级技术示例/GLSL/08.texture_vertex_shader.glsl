
//顶点着色器
attribute vec4 a_Position; // 顶点坐标
attribute vec4 a_Normal;  // 法向量
attribute vec2 a_TexCoord; // 纹理坐标
uniform mat4 u_MvpMatrix; // 投影视图矩阵
uniform mat4 u_NormalMatrix; // 法线转换矩阵
varying float v_NdotL;
varying vec2 v_TexCoord;

void main(){

    vec3 lightDirection = vec3(0.0, 0.0, 1.0);// 灯光位置在世界坐标系中
    gl_Position = u_MvpMatrix * a_Position; // 计算后的顶点坐标
    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_NdotL = max(dot(normal, lightDirection), 0.0);
    v_TexCoord = a_TexCoord; // 纹理坐标

}