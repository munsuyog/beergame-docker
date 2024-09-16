export const getIncomingOrder = (obj) => {
    if (obj && typeof obj === 'object') {
      const subObjects = obj;
      for (const key in subObjects) {
        if (subObjects.hasOwnProperty(key)) {
          return subObjects[key];
        }
      }
    }
    return null;
  }