// const vs freeze
const obj = { foo: { bar: 2 }, roo: 2 }
const obj1 = { foo: { bar: 2 }, roo: 2 } as const

Object.assign(obj, { too: 12 })
obj.roo = 23
obj['boo'] = 23
Object.freeze(obj)

obj.foo.bar = 23

// Object.assign(obj, { goo: 12 }); //TypeError: Cannot add property goo, object is not extensible
Object.assign(obj1, { goo: 12 })
Object.assign(obj.foo, { goo: 12 })
// delete obj1.roo;

console.log('obj', obj)
console.log('obj1', obj1)
