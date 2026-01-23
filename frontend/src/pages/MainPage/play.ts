const obj = {
  name: 'Marina',
  getName() {
    // function getNameInternal() {
    //   return this.name
    // }
    setTimeout(() => console.log(this.name), 100)
    // console.log(getNameInternal())
    // console.log(this.name)
  },
}

obj.getName()

const myObjectGetName = obj.getName

myObjectGetName()

const secondObject = {}
