import RStruct from 'rstruct'

describe('RStruct', () => {
  it('assigns attribute names and attributes', () => {
    let Struct = new RStruct('a', 'b')
    let instance = new Struct(1, 2)

    expect(instance.a).toEqual(1)
    expect(instance.b).toEqual(2)
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
