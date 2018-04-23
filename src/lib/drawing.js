export function randomLine(start, end, numStops, range) {
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;

  const xChunk = xDiff / (numStops + 1);
  const yChunk = yDiff / (numStops + 1);

  const stops = Array(numStops)
    .fill(undefined)
    .map((_, index) => {
      const xNoise = (Math.random() - 0.5) * range;
      const yNoise = (Math.random() - 0.5) * range;

      return {
        x: start.x + xChunk * (index + 1) + xNoise,
        y: start.y + yChunk * (index + 1) + yNoise
      };
    });
  return [start, ...stops, end];
}

export function lineAsD(path) {
  const stringList = path.map((coords, index) => {
    return cToS(coords, index === 0);
  });
  return stringList.join(" ") + " Z";
}

export function cToS({ x, y }, start = false) {
  const letter = start ? "M" : "L";
  return `${letter} ${x} ${y}`;
}

