export default class Glyph {
  constructor(letter, str) {
    this.letter = letter;
    this.pattern = this.patternFromStr(str);
    this.points = [];
    this.width = 0;

    this.pattern.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          if (x > this.width) {
            this.width = x;
          }
          this.points.push({ x, y });
        }
      });
    });
    this.width += 1;
    // console.log(this.letter);
    // console.log(this.points);
    // console.log(this.width);
  }

  patternFromStr = str => str.split('\n')
    .filter(v => v.length > 0)
    .map(line => [...line].map(c => (c === '#' ? 1 : 0)));
}
