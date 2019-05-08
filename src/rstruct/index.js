import identifierfy from 'identifierfy'

export default function RStruct(...attributes) {
  let methods
  let lastArgument = attributes[attributes.length - 1]

  if (lastArgument instanceof Object) {
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
    let methodNames = Object.keys(methods)

    methodNames.forEach(name => {
      let methodBody = methods[name]

      if (!(methodBody instanceof Function))
        throw new Error(`${name} is not a valid function`)

      klass.prototype[name] = methods[name]
    })
  }

  return klass
}

function validateAttributeName(name) {
  if (name !== identifierfy(name)) {
    throw new Error(`${name} is not a valid JavaScript identifier`)
  }
}
