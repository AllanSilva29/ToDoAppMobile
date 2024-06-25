import Gradient from "javascript-color-gradient";

export function getGradient(color1, color2) {
  const colorGradient = new Gradient();
  // colorGradient.setGradient("#e6062d", "#408247"); // from red to green
  colorGradient.setColorGradient(color1, color2);
  colorGradient.setMidpoint(24); // set to 8 color steps
  return colorGradient.getColor(2);
}
