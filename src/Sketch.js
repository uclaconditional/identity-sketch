import p5 from 'p5';
import * as dat from 'dat.gui';

import * as glyphPatterns from './glyphs';
import Glyph from './Glyph';
import Layout from './Layout';

export default class Sketch extends p5 {
  dotSize = 14;
  gridSize = 0;
  displayGrid = true;
  seed = 0;
  dotColor = 238;

  glyphs = {};

  constructor() {
    super(() => {});
    this.seed = this.random(0, 10000);
    this.gridSize = this.windowWidth / 80;
  }

  setup = () => {
    const canvas = this.createCanvas(this.windowWidth - 40, this.windowHeight - 40);
    canvas.parent(document.querySelector('.logo')); // eslint-disable-line

    Object.keys(glyphPatterns).forEach((letter) => {
      if (!Array.isArray(this.glyphs[letter])) {
        this.glyphs[letter] = [];
      }
      glyphPatterns[letter].forEach((pat) => {
        this.glyphs[letter].push(new Glyph(letter, pat));
      });
    });

    this.layout = new Layout(
      this.width / this.gridSize,
      this.height / this.gridSize,
      this.getGlyphsForLayout(),
    );

    const gui = new dat.GUI();
    gui.add(this, 'gridSize', 1, 30).onChange(() => {
      this.layout.setSize(
        Math.floor(this.width / this.gridSize),
        Math.floor(this.height / this.gridSize),
      );
    });
    gui.add(this, 'dotSize', 1, 100);
    gui.add(this, 'displayGrid');
  };

  draw = () => {
    this.randomSeed(this.seed);
    this.noStroke();
    this.background(23);

    if (this.displayGrid) {
      this.stroke(0, 174, 239);
      for (let x = 0; x < this.width; x += this.gridSize) {
        for (let y = 0; y < this.height; y += this.gridSize) {
          this.point(x, y);
        }
      }
    }

    this.noStroke();
    this.fill(this.dotColor);
    const p = this.layout.update();
    this.push();
    this.translate(2 * this.gridSize, 2 * this.gridSize);
    p.forEach(this.drawPoint);
    this.pop();
  };

  windowResized = () => {
    this.resizeCanvas(this.windowWidth - 40, this.windowHeight - 40);
  };

  drawPoint = ({ x, y }) => {
    this.ellipse(x * this.gridSize, y * this.gridSize, this.dotSize, this.dotSize);
  }

  getGlyphsForLayout = () => (
    [
      this.glyphs.c[0],
      this.glyphs.o[0],
      this.glyphs.n[0],
      this.glyphs.d[0],
      this.glyphs.i[0],
      this.glyphs.t[0],
      this.glyphs.i[1],
      this.glyphs.o[1],
      this.glyphs.n[1],
      this.glyphs.a[0],
      this.glyphs.l[0],
      '\n',
      this.glyphs.s[0],
      this.glyphs.t[1],
      this.glyphs.u[0],
      this.glyphs.d[1],
      this.glyphs.i[0],
      this.glyphs.o[1],
    ]
  )
}
