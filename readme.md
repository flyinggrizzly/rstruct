# RStruct

RStruct is a Ruby-like Struct factory for JavaScript.

## Usage

Import `RStruct`, and create a new Struct with your named parameters (must be
strings):

```javascript
import RStruct from 'rstruct'

const MyStruct = new RStruct('firstParam', 'secondParam')

let instance = new MyStruct(1, 2)

instance.firstParam //=> 1
instance.secondParam //=> 2
```

You can also define methods on the new Struct by passing in an object with
definitions (don't forget to use commas if you're defining multiple methods):

```javascript
const MyStruct = new RStruct('one', 'two', {
  addParams() {
    return this.one + this.two
  },
  multiplyParams() {
    return this.one * this.two
  }
})

let instance = new MyStruct(10, 2)

instance.addParams() //=> 12
instance.multiplyParams() //=> 20
```

When defining methods, you can also use `methodName: function() { ... }` syntax,
but fat-arrow functions **won't** work (because of the way that `this` scopes):

```javascript
const MyStruct = new RStruct('one', 'two', {
  addParams: function() { return this.one + this.two }, // OK!
  multiplyParams: () => { return this.one * this.two }  // throws errors
})
```

Attribute and method names **must** begin with a char, dollar-sign, or
underscore, and otherwise contain only chars, numbers, dollar-signs, and
underscores, and must not be reserved JS keywords. Basically, they need to be
valid JS identifiers:

```javascript
// Good
const MyStruct = new RStruct('_param', 'another_param', 'param3', `$param`, {
  method() { ... },
  method_2() { ... },
  method3WithCamelCase() { ... },
  _privateMethod() { ... },
  $method() { ... }
})

// Bad
const BadStruct = new RStruct('1stParam', 'hyphenated-param', 'wtf$!?#!')
```

This is currently limited to ASCII characters, so this is technically a subset
of valid JS identifiers. I'm open to PRs to add full Unicode support.

