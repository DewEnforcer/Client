class Lens { //child of lensflare
  constructor(star, lensPos) {
    this.lensPos = lensPos;
    this.sprite = new Image();
    this.sprite.src = `./spacemap/lensflares/lensflare${star.id}/lens/${lensPos}.png`;
    this.ID = getLaserID(); //TODO add seperate ids for lenses
    this.star = star;
    this.renderX = 0;
    this.renderY = 0;
    this.spread = {
      x: 0,
      y: 0,
    };
    this.offset = getLensOffset(star.id, lensPos);
    this.display = false;
  }
  getAngleFromCamera() {
    return calcAngle(
      this.star.renderX,
      this.star.renderY,
      halfScreenWidth,
      halfScreenHeight
    );
  }
  getDistanceFromCamera() {
    return getDistance(
      this.star.renderX,
      this.star.renderY,
      halfScreenWidth,
      halfScreenHeight
    );
  }
  updateGap() {
    let dist = this.getDistanceFromCamera();
    let angle = this.getAngleFromCamera();
    angle += toRadians(90);
    let realGap = dist * (0.3 * this.lensPos);
    this.spread.x = -(realGap * Math.cos(angle));
    this.spread.y = realGap * Math.sin(angle);
  }
  changeRender() {
    this.renderX =
      this.star.x +
      this.spread.x -
      CAMERA.followX / this.star.z +
      halfScreenWidth;
    this.renderY =
      this.star.y +
      this.spread.y -
      CAMERA.followY / this.star.z +
      halfScreenHeight;
  }
  draw() {
    if (!this.display) return;
    ctx.drawImage(
      this.sprite,
      this.renderX - this.offset.x,
      this.renderY - this.offset.y
    );
  }
  update() {
    this.updateGap();
    this.changeRender();
    this.draw();
  }
}
