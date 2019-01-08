export default class Glyph {
  constructor(str) {
    this.pattern = this.patternFromStr(str);
    this.map = [];
    this.width = 0;

    this.pattern.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          if (x > this.width) {
            this.width = x;
          }
          this.map.push({ x, y });
        }
      });
    });
  }

  patternFromStr = str => str.split('\n')
    .filter(v => v.length > 0)
    .map(line => [...line].map(c => (c === '#' ? 1 : 0)));
}
