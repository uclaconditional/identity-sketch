import p5 from 'p5';
import * as dat from 'dat.gui';

import * as glyphPatterns from './glyphs';
import Glyph from './Glyph';

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
    this.gridSize = this.windowWidth / 71;
  }

  setup = () => {
    Object.keys(glyphPatterns).forEach((letter) => {
      if (!Array.isArray(this.glyphs[letter])) {
        this.glyphs[letter] = [];
      }
      glyphPatterns[letter].forEach((pat) => {
        this.glyphs[letter].push(new Glyph(pat));
      });
    });

    this.createCanvas(this.windowWidth, this.windowHeight);
    const gui = new dat.GUI();
    gui.add(this, 'gridSize', 1, 30);
    gui.add(this, 'dotSize', 1, 100);
    gui.add(this, 'displayGrid');
  };

  draw = () => {
    this.randomSeed(this.seed);
    this.background(238);
    this.noStroke();

    this.fill(23);
    this.rect(
      this.gridSize, this.gridSize,
      this.width - (this.gridSize * 2), this.height - (this.gridSize * 2),
    );

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
    this.drawGlyph(this.glyphs.c[0], 4, 4);
    this.drawGlyph(this.glyphs.o[0], 10, 4);
    this.drawGlyph(this.glyphs.n[0], 17, 4);
    this.drawGlyph(this.glyphs.d[0], 23, 4);
    this.drawGlyph(this.glyphs.i[0], 29, 4);
    this.drawGlyph(this.glyphs.t[0], 34, 4);
    this.drawGlyph(this.glyphs.i[1], 40, 4);
    this.drawGlyph(this.glyphs.o[1], 45, 4);
    this.drawGlyph(this.glyphs.n[1], 51, 4);
    this.drawGlyph(this.glyphs.a[0], 57, 4);
    this.drawGlyph(this.glyphs.l[0], 64, 4);

    this.drawGlyph(this.glyphs.s[0], 4, 13);
    this.drawGlyph(this.glyphs.t[1], 10, 13);
    this.drawGlyph(this.glyphs.u[0], 17, 13);
    this.drawGlyph(this.glyphs.d[1], 23, 13);
    this.drawGlyph(this.glyphs.i[0], 29, 13);
    this.drawGlyph(this.glyphs.o[1], 34, 13);
  };

  windowResized = () => {
    this.resizeCanvas(this.windowWidth, this.windowHeight);
  };

  drawGlyph = (glyph, x, y) => {
    this.push();
    this.translate(x * this.gridSize, y * this.gridSize);
    glyph.map.forEach(this.drawGlyphPoint);
    this.pop();
  }

  drawGlyphPoint = ({ x, y }) => {
    this.ellipse(x * this.gridSize, y * this.gridSize, this.dotSize, this.dotSize);
  }
}
