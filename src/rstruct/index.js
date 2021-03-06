const RStruct = function (...attributes) {
  let methods
  let lastArgument = attributes[attributes.length - 1]

  if (lastArgument instanceof Object) {
    methods = attributes.pop()
  }

  validateBarewordNames(attributes)

  const klass = class {
    constructor() {
      attributes.forEach((name, index) => {
        this[name] = arguments[index]
      })
    }
  }

  if (methods) {
    let methodNames = Object.keys(methods)

    validateBarewordNames(methodNames)

    methodNames.forEach(name => {
      let methodBody = methods[name]

      if (!(methodBody instanceof Function))
        throw new Error(`${name} is not a valid function`)

      klass.prototype[name] = methods[name]
    })
  }

  return klass
}

function validateBarewordNames(attributes) {
  attributes.forEach(name => validateAttributeName(name) )
}

function validateAttributeName(name) {
  const identifierRegex = /^[a-zA-Z_$]{1}[\w$]*$/

  if (name.match(identifierRegex) === null) {
    throw new Error(`${name} is not a valid JavaScript identifier`)
  }
}

module.exports = RStruct
