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

Attribute and method names **must** begin with a char or underscore, and otherwise contain
only chars, numbers, and underscores, which is a subset of JS's valid
identifiers[^subset-of-js-identifiers]:

```javascript
// Good
const MyStruct = new RStruct('param', 'another_param', 'param3', {
  method() { ... },
  method_2() { ... },
  method3WithCamelCase() { ... },
  _privateMethod() { ... }
})

// Bad
const BadStruct = new RStruct('1stParam', 'hyphenated-param', 'wtf$!?#!')
```

---

[^subset-of-js-identifiers]: JS allows any alphanumeric character, as well as `_` and `$` in identifiers, and requires they not begin with a number. `RStruct` further disallows `$`. See https://developer.mozilla.org/en-US/docs/Glossary/Identifier for more.
