function first() {
  console.log('first(): factory evaluated')
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first(): called')
  }
}

function second() {
  console.log('second(): factory evaluated')
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second(): called')
  }
}

function validateMethod() {
  console.log('validateMethod(): factory evaluated')

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('validation')
  }
}

class ExampleClass {
  @first()
  @second()
  @validateMethod()
  method() {}
}
