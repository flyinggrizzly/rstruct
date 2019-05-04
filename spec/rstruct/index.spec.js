import RStruct from 'rstruct'

describe('RStruct', () => {
  describe('setting attributes', () => {
    it('assigns attribute names and attributes', () => {
      let Struct = new RStruct('a', 'b')
      let instance = new Struct(1, 2)

      expect(instance.a).toEqual(1)
      expect(instance.b).toEqual(2)
    })

    describe('attribute and method name validation', () => {
      it('requires a char or underscore as the first character', () => {
        expect(() => {
          new RStruct('1stParam')
        }).toThrowError()

        expect(() => {
          new RStruct('_privateParam', 'publicParam', 'PascalParam')
        }).not.toThrowError()

        expect(() => {
          new RStruct('a', {
            $method() {
              return `
                '$method' is a valid identifier, invalid RStruct method name.
                See https://developer.mozilla.org/en-US/docs/Glossary/Identifier for more.
              `
            }
          }).toThrowError()
        })
      })

      it('allows numbers in names after the first character', () => {
        expect(() => {
          new RStruct('paramWithNumeral1inIt')
        }).not.toThrowError()

        expect(() => {
          new RStruct('a', {
            methodWithNumeral1InName() {
              return 'valid'
            }
          })
        }).not.toThrowError()
      })
    })
  })

  describe('when given an object with method definitions', () => {
    let StructWithMethods = new RStruct('a', 'b', {
      add() {
        return this.a + this.b
      },
      multiply() {
        return this.a * this.b
      }
    })
    let instance = new StructWithMethods(1, 2)

    it('adds methods to the new prototype', () => {
      expect(instance.add()).toEqual(3)
      expect(instance.multiply()).toEqual(2)
    })

    describe('when no attributes are set, only methods', () => {
      it('', () => {
        expect(() => {
          new RStruct({
            lonelyMethod(a, b) {
              return a + b
            }
          }).not.toThrow()
        })

        let MethodsOnly = new RStruct({
          lonelyMethod(a, b) {
            return a + b
          }
        })
        let instance = new MethodsOnly()
        expect(instance.lonelyMethod(1,2)).toEqual(3)
      })
    })

    describe('when an invalid function is passed', () => {
      it('raises an error', () => {
        expect(() => {
          new RStruct('a', 'b', {
            notAFunction: 'not a function'
          })
        }).toThrow()
      })
    })
  })
})
