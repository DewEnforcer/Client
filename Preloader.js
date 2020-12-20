class Preloader {
  constructor(models) {
    this.modelsData = models;
    this.modelsBuffer = {}
  }
  preload() {
    for (let modelType in this.modelsData) {
      const typeData = this.modelsData[modelType];
      this.modelsBuffer = {...this.modelsBuffer, [modelType]: {}} //allocate space for the section of models
      for (let model in typeData) { //TODO REWORK INTO FUNCTIONAL CODE
        if (Array.isArray(typeData[model])) { //if is sprite data, else 
          this.modelsBuffer[modelType] = {...this.modelsBuffer[modelType], [model]: []} //allocate space for model
          this.preloadModel(modelType, this.modelsBuffer[modelType][model], typeData[model]);
        } else {
          this.modelsBuffer[modelType] = {...this.modelsBuffer[modelType], [model]: {}} //allocate space for model
          for (let SubModelKey in typeData[model]) {
            if (Array.isArray(typeData[model][SubModelKey])) {
              this.modelsBuffer[modelType][model] = {...this.modelsBuffer[modelType][model], [SubModelKey]: []} //allocate space for model
              this.preloadModel(modelType, this.modelsBuffer[modelType][model][SubModelKey], typeData[model][SubModelKey]);
            } else {
              this.modelsBuffer[modelType][model] = {...this.modelsBuffer[modelType][model], [SubModelKey]: {}} //allocate space for model
              for (let SubSubModelKey in typeData[model][SubModelKey]) {
                  this.modelsBuffer[modelType][model][SubModelKey] = {...this.modelsBuffer[modelType][model][SubModelKey], [SubSubModelKey]: []} //allocate space for model
                  this.preloadModel(modelType, this.modelsBuffer[modelType][model][SubModelKey][SubSubModelKey], typeData[model][SubModelKey][SubSubModelKey]);
              }              
            }
          }
        }
      }
    }
  }
  preloadModel(modelType, allocatedArr, modelData) {
    this.preloadSprite(allocatedArr, modelData[2], modelData, true);
    if (modelType == "ships") DEFAULT_SHIP_SPRITE_OFFSET++;
  }
  preloadSprite(allocatedArr, spriteIndex, modelData, isInit = false) {
    if (spriteIndex > modelData[1]) {
      progress++;
      manageLoadingBar();
      return;
    }
    let buffSprite = new Image();
    buffSprite.src = `./spacemap/${modelData[0]}/${spriteIndex}.png`;
    if (isInit && spriteIndex > 0) {
      for (let i = 0; i < spriteIndex; i++) {
        allocatedArr.push(null);
      }
    }
    allocatedArr.push(null); //push placeholder
    const completeLoad = (isFail = false) => {
      allocatedArr[spriteIndex] = buffSprite;
      spriteIndex++;
      this.preloadSprite(allocatedArr, spriteIndex, modelData);
      if (isFail) {
        //todo ADD LOGGER
      }
    }
    buffSprite.onload = () => completeLoad();
    buffSprite.onerror = () => completeLoad(true);
  }
  notifyUser(errType) {
    //TODO
  }
  deliverErrorReport(type) {
    fetch("./include/gameLogger.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `gameError=${type}&userID=${userID}&tsmp=${Date.now()}`,
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      });
  }
}
