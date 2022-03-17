void main(){
  // 变量名不能以gl_作为前缀，这个是GLSL保留的前缀
  gl_Position=vec4(0.,0.,0.,.8)//设置顶点坐标
  gl_PointSize=10.0//设置点的大小
}