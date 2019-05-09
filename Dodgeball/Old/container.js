// Container.js

// Container file for our level.


var levelDataStructure = {
  cols: 7,
  rows: 2,
  tiles: [
    1, 0, 1, 0, 1, 0, 1,
    0, 1, 0, 1, 0, 1, 0
  ],
  getTile: function(col, row) {
    return this.tiles[row * this.cols + col];
  },
  setTile: function(col, row, input) {
    this.tiles[row * this.cols + col] = input;
  },
  getXPixel: function() {
  	return this.cols * 35;
  }
};