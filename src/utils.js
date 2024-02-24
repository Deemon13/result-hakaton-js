export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor(str) {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += str[random(0, str.length - 1)];
  }

  return color;
}