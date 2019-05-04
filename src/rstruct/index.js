import _ from 'lodash'

export default function RStruct(...attributes) {
  let methods
  if (_.last(attributes) instanceof Object)
    methods = attributes.pop()

  const klass = class {
    constructor() {
      attributes.forEach((name, index) => {
        //validateAttributeName(name)
        this[name] = arguments[index]
      })
    }
  }

  if (methods) {
    let methodNames = _.keys(methods)

    methodNames.forEach(name => {
      let methodBody = methods[name]

      if (!(methodBody instanceof Function))
        throw new Error(`${name} is not a valid function`)

      klass.prototype[name] = methods[name]
    })
  }

  return klass
}
