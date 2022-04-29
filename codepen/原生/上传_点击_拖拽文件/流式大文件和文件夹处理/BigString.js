class BigString extends Array {

  // /**
  //  * 获取所有字符索引
  //  * @param {String} str 
  //  */
  // getStringIndex_Array(str) {
  //   let set = new Set();
  //   let stringIndexInBigString = 0 //整个字符串中起始索引
  //   for (let index = 0; index < this.length - 1; index++) {
  //     const stringThis = this[index];
  //     const stringNext = this[index + 1];
  //     const stringFullTwo = stringThis + stringNext
  //     const indexStr = stringFullTwo.indexOf(str)
  //     indexStr > -1 && set.add(stringIndexInBigString + indexStr)
  //     stringIndexInBigString += stringThis.length
  //   }
  // }

  stringLength() {
    let stringFulllength = 0
    for (let index = 0; index < this.length; index++) {
      const stringThis = this[index];
      stringFulllength += stringThis.length
    }
    return stringFulllength
  }

  /**
   * 获取字符索引
   * @param {String} str 
   */
  indexOf_Array(str) {
    let stringIndexInBigString = 0 //整个字符串中起始索引
    for (let index = 0; index < this.length - 1; index++) {
      const stringThis = this[index];
      const stringNext = this[index + 1];
      const stringFullTwo = stringThis + stringNext
      let indexStr = stringFullTwo.indexOf(str)
      if (indexStr >= stringThis.length) { //判定在前后哪个数组 后面数组要预处理    lastIndexOf_Array不存在问题
        index++
        indexStr -= stringThis.length
      }

      if (indexStr > -1) return { stringIndex: stringIndexInBigString + indexStr, arrayIndex: index, stringIndexInArray: indexStr }
      stringIndexInBigString += stringThis.length
    }
  }

  /**
   * 获取字符后索引   12345 3 3
   * @param {String} str 
   */
  /**
   * 获取字符后索引   12345 3 3
   * @param {String} str 
   * @returns { stringIndex: stringIndexInBigString + indexStr, arrayIndex: index, stringIndexInArray: indexStr }
   */
  lastIndexOf_Array(str) {
    let stringIndexInBigString = this.stringLength() - this[this.length - 1].length //整个字符串中起始索引

    for (let index = this.length - 2; index >= 0; index--) {
      const stringThis = this[index];
      const stringNext = this[index + 1];
      stringIndexInBigString -= stringThis.length
      const stringFullTwo = stringThis + stringNext
      const indexStr = stringFullTwo.lastIndexOf(str)
      if (indexStr > -1) return { stringIndex: stringIndexInBigString + indexStr, arrayIndex: index, stringIndexInArray: indexStr }
    }
  }

  /**
   * startStr, endStr 包含的所有字符(不包含后面)
   * @param {String} startStr 
   * @param {String} endStr 
   */
  substringByStr(startStr, endStr) {
    const startIndexObj = this.indexOf_Array(startStr)
    const lastIndexObj = this.lastIndexOf_Array(endStr)
    // 开始读取

    let stringResult = ''
    if (!startIndexObj.stringIndex && !lastIndexObj.stringIndex || lastIndexObj.stringIndex < startIndexObj.stringIndex) return null
    // 在一个数组中
    if (startIndexObj.arrayIndex == lastIndexObj.arrayIndex) return this[startIndexObj.arrayIndex].slice(startIndexObj.stringIndexInArray, lastIndexObj.stringIndexInArray)
    // 不同数组中
    let startIndex = startIndexObj ? startIndexObj.arrayIndex : 0,
      endIndex = lastIndexObj ? lastIndexObj.arrayIndex : this.length - 1
    for (let index = startIndex; index <= endIndex; index++) {
      const stringThis = this[index];
      if (index == startIndexObj.arrayIndex) {
        stringResult += stringThis.slice(startIndexObj.stringIndexInArray)
        continue
      }
      if (index == lastIndexObj.arrayIndex) {
        stringResult += stringThis.slice(0, lastIndexObj.stringIndexInArray)
        continue
      }
      stringResult += stringThis
    }
    return stringResult
  }

  substringByIndex() {

  }

  log() {
    for (let index = 0; index < this.length; index++) {
      const stringThis = this[index];
      console.log(index, stringThis)
    }

  }


  //   getIndicesOf(searchStr, str, caseSensitive) {
  //     var searchStrLen = searchStr.length;
  //     if (searchStrLen == 0) {
  //         return [];
  //     }
  //     var startIndex = 0, index, indices = [];
  //     if (!caseSensitive) {
  //         str = str.toLowerCase();
  //         searchStr = searchStr.toLowerCase();
  //     }
  //     while ((index = str.indexOf(searchStr, startIndex)) > -1) {
  //         indices.push(index);
  //         startIndex = index + searchStrLen;
  //     }
  //     return indices;
  // }
}


export {BigString}