

let testFunc = (data) =>{
  console.log('test:',data)
  let bigString = new BigString()
  bigString.push('01234')
  bigString.push('56789')
  bigString.push('1011121314')
  bigString.push('1516171819')
  console.log(bigString)
  let test = bigString.substringByStr('1112','314')
  console.log(test)
}
