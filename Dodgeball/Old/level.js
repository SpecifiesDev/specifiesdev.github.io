// Level.js

class Level {

  constructor(tileMap, context) {
    this.map = tileMap;
    this.ctx = context;
    this.tileZeroPath = "./zero.png";

  }




  getMapArray() {
    var array = [];
    for(var c = 0; c < this.map.cols; c++) {
      for(var r = 0; r < this.map.rows; r++) {
        var tile = this.map.getTile(c, r);
        if(tile == 0) {
            array.push(new Wall(this.tileZeroPath, 35, 35, this.ctx, c * 35, r * 35 ));
        }
        if(tile == 1) {
            array.push(new Wall("path", 35, 35, this.ctx, c * 35, r * 35));
        }
      }
    }

    return array;
  }




}