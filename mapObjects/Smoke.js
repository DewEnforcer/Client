class Smoke {
  constructor(x, y, type, parentEngine, activateOn = 1) {
    this.x = x;
    this.y = y;
    this.renderX = this.x;
    this.renderY = this.y;
    this.type = type;
    this.fadeOutFrame = 20;
    this.startFrame = 0;
    this.seq = 0;
    this.frame = 0;
    this.activateOnFrame = activateOn;
    this.sprite = new Image();
    this.setSpriteSeq();
    this.x -= 15.5; //change later to dynamic value
    this.y -= 15.5;
    this.parentEngine = parentEngine;
    this.setRenderPos();
  }
  setSpriteSeq() {
    this.sprite.src = `./spacemap/smokes/${this.type}/${this.seq}.png`;
  }
  setRenderPos() {
    this.renderX = this.x - CAMERA.followX + halfScreenWidth;
    this.renderY = this.y - CAMERA.followY + halfScreenHeight;
  }
  draw() {
    ctx.drawImage(this.sprite, this.renderX, this.renderY);
  }
  terminate() {
    this.parentEngine.smoke.splice(0, 1);
  }
  update() {
    this.setRenderPos();
    this.frame++;
    if (this.frame % this.activateOnFrame == 0) this.seq++;
    this.setSpriteSeq();
    this.draw();
    if (this.seq >= this.fadeOutFrame) this.terminate();
  }
}
