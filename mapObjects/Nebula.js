class Nebula {
  constructor(x, y, z, type, id) {
    this.x = x;
    this.y = y;
    this.renderX = x;
    this.renderY = y;
    this.z = z;
    this.type = type;
    this.sprite = new Image();
    this.sprite.src = `./spacemap/nebulas/${type}/${id}.png`;
    this.settingMenu = MENU_GRAPHICS;
    this.settingIndex = 2;
  }
  setRenderPos() {
    this.renderX = this.x - CAMERA.followX / this.z + halfScreenWidth;
    this.renderY = this.y - CAMERA.followY / this.z + halfScreenHeight; 
  }
  draw() {
    ctx.drawImage(this.sprite, this.renderX, this.renderY);
  }
  update() {
    if (!SETTINGS.settingsArr[this.settingMenu][this.settingIndex]) return;
    this.setRenderPos();
    this.draw();
  }
}
