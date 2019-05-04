import _ from 'lodash'

export default function RStruct(...args) {
  let methods
  if (_.last(args) instanceof Object)
    methods = args.pop()

  const klass = class {
    constructor() {
      args.forEach((arg, index) => {
        this[arg] = arguments[index]
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
