// 顶点着色器
attribute vec4 a_Position;
attribute vec4 a_Normal;
uniform mat4 u_MvpMatrix;
uniform mat4 u_NormalMatrix;
varying vec4 v_Color;

void main(){

    vec3 lightDirection = vec3(0.0, 0.0, 1.0); // 灯光的位置 在世界坐标系中
    vec4 color = vec4(0.5, 0.5, 0.8, 1.0);// 表面颜色
    gl_Position = u_MvpMatrix * a_Position; // 计算后的顶点坐标
    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));//标准化法向量
    float nDot = max(dot(normal, lightDirection), 0.0);
    v_Color = vec4(color.rgb * nDot, color.a);
    
}