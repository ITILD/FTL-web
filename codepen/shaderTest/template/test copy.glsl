attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute vec4 color;
varying vec4 v_color;
attribute float batchId;
void main() {
  vec4 p = czm_computePosition();
  v_color = color;
  p = czm_modelViewProjectionRelativeToEye * p;
  gl_Position = p;
}
