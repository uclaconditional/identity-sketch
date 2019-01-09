export default class Layout {
  width = 0;
  height = 0;
  marginX = 0;
  marginY = 0;
  points = [];
  needsUpdate = true;


  constructor(width, height, glyphs = false) {
    this.width = width;
    this.height = height;
    if (glyphs !== false) {
      this.setGlyphs(glyphs);
    }
  }

  setGlyphs(glyphs) {
    this.glyphs = glyphs;
    this.needsUpdate = true;
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;
    this.needsUpdate = true;
  }

  update() {
    if (this.needsUpdate) {
      this.points = [];
      let offsetX = 0;
      let offsetY = 0;
      this.glyphs.forEach((glyph) => {
        if (glyph === '\n') {
          offsetY += 9;
          offsetX = 0;
        } else {
          if ((glyph.width + offsetX) > this.width) {
            offsetY += 9;
            offsetX = 0;
          }
          glyph.points.forEach(({ x, y }) => {
            this.points.push({
              x: x + offsetX,
              y: y + offsetY,
            });
          });
          offsetX += (glyph.width + 2);
        }
      });
      this.needsUpdate = false;
    }
    return this.points;
  }
}
