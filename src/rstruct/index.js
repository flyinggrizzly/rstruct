import _ from 'lodash'

export default function RStruct(...attributes) {
  let methods
  if (_.last(attributes) instanceof Object) {
    methods = attributes.pop()
  }

  attributes.forEach(name => {
    validateAttributeName(name)
  })

  const klass = class {
    constructor() {
      attributes.forEach((name, index) => {
        this[name] = arguments[index]
      })
    }
  }

  if (methods) {
    let methodNames = _.keys(methods)

    methodNames.forEach(name => {
      validateMethodName(name)

      let methodBody = methods[name]

      if (!(methodBody instanceof Function))
        throw new Error(`${name} is not a valid function`)

      klass.prototype[name] = methods[name]
    })
  }

  return klass
}

function validateAttributeName(name) {
  validateAllCharsOfName(name)
  validateFirstCharOfName(name)
}

function validateMethodName(name) {
  // JS will raise a SyntaxError if the first char of an object
  // key is a numeral, so we're covered there for method names
  // starting with numbers
  validateAllCharsOfName(name)
}

function validateAllCharsOfName(name) {
  const validCharacters = "abcdefghijklmnopqrstuvwxyz_1234567890".split('')
  let characters = name.split('')

  characters.forEach(c => {
    if (!(_.includes(validCharacters, _.toLower(c))))
      throw new Error(`${name}: attributes and method names must consist of only chars, numbers, and underscores ('_')`)
  })
}

function validateFirstCharOfName(name) {
  const validCharacters = "abcdefghijklmnopqrstuvwxyz_".split('')
  let firstCharacter = _.head(name.split(''))

  if (!(_.includes(validCharacters, _.toLower(firstCharacter))))
    throw new Error(`${name}: attribute and method names must begin with a char or underscore ('_')`)
}
