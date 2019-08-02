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
      const VALID_IDENTIFIERS = [
        '$startsWithDollar',
        'startsWithChar',
        '_startsWithUnderscore',
        'StartsWithCapital',
        'includesNumeralOne_1'
      ]

      const INVALID_IDENTIFIERS = [
        '1_startsWithNumeral',
        'includes_!_exclamation_point',
        'uses-hyphens',
        'includes@sign'
      ]

      it('verifies attribute names are valid JS identifiers', () => {
        expect(() => {
          new RStruct(...VALID_IDENTIFIERS)
        }).not.toThrowError()

        INVALID_IDENTIFIERS.forEach(badIdentifier => {
          expect(() => {
            new RStruct(badIdentifier)
          }).toThrowError()
        })
      })

      it('validates method names', () => {
        VALID_IDENTIFIERS.forEach(bareword => {
          expect(() => {
            new RStruct({
              [bareword]: function() { return true }
            })
          }).not.toThrowError()
        })

        INVALID_IDENTIFIERS.forEach(bareword => {
          expect(() => {
            new RStruct({
              [bareword]: function() { return true }
            })
          }).toThrowError()
        })
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
