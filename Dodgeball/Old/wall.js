// wall.js

class Wall {

  constructor(imgPath, w, h, context, x, y) {
    this.image = new Image(5, 5);
    this.path = imgPath;
    this.image.src = imgPath;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.ctx = context;
  }


  draw() {
    try {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    catch(err) {
      console.error(err);
    }
  }





}