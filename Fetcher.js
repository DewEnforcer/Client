class Fetcher {
  static fetchAll() {
    this.fetchData();
    this.fetchTranslations();
    this.fetchMapObjects();
    this.fetchDroneObjects();
    this.fetchEngineData();
    this.fetchLaserData();
    this.fetchActionbarData();
    this.fetchSpacemapInfo();
  }
  static fetchData() {
    fetch("./js/client/gameData.json")
      .then((res) => res.json())
      .then((data) => {
        DEFAULTS = data.defaults;
        progress++;
        COLORS = data.colors;
        progress++;
        UI_DATA = data.ui;
        progress++;
        GAME_MSGS = data.gameMsg;
        progress++;
        LASER_DATA = data.laser_data;
        progress++;
        SHIP_NAMES = data.shipNames;
        progress++;
        OFFSET_DATA = data.offsets;
        progress++;
        LENS_AMOUNTS = data.lensNumber;
        SPRITE_ID_LIST = data.spriteIDS;
        PORTAL_LIST_DATA = data.Portals;
        manageLoadingBar();
      });
  }
  static fetchSpacemapInfo() {
    fetch("./js/client/spacemap.json")
      .then((res) => res.json())
      .then((data) => {
        MAP_OVERVIEW_LIST = data;
      });
  }
  static fetchTranslations(callback = null) {
    fetch("./js/client/texts.json")
      .then((res) => res.json())
      .then((data) => {
        TEXT_TRANSLATIONS = data[CURRENT_LANGUAGE];
        progress++;
        manageLoadingBar();
        if (callback != null) callback();
      });
  }
  static fetchMapObjects() {
    fetch("./js/client/mapObjects.json")
      .then((res) => res.json())
      .then((data) => {
        MAP_OBJECTS_LIST = data;
        progress++;
        manageLoadingBar();
      });
  }
  static fetchDroneObjects() {
    fetch("./js/client/dronePos.json")
      .then((res) => res.json())
      .then((data) => {
        DRONE_POSITIONS = data;
        progress++;
        manageLoadingBar();
      });
  }
  static fetchEngineData() {
    fetch("./js/client/enginePos.json")
      .then((res) => res.json())
      .then((data) => {
        SHIPS_ENGINES = data;
        progress++;
        manageLoadingBar();
      });
  }
  static fetchLaserData() {
    fetch("./js/client/laserPos.json")
      .then((res) => res.json())
      .then((data) => {
        LASER_POS = data;
        progress++;
        manageLoadingBar();
      });
  }
  static fetchActionbarData() {
    fetch("./js/client/SubmenuItems.json")
      .then((res) => res.json())
      .then((data) => {
        SUB_MENU_ITEMS = data;
        progress++;
        manageLoadingBar();
      });
  }
}
