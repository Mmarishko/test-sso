export function checkSet() {
  let arr: number[] = [],
    set: Set<number> = new Set(),
    n: number = 1000000

  for (let i = 0; i < n; i++) {
    arr.push(i)
    set.add(i)
  }
  //1 has
  let result

  console.time('Array')

  result = arr.indexOf(123123) !== -1

  console.timeEnd('Array')
  console.time('Set')

  result = set.has(123123)

  console.timeEnd('Set')

  //2 add
  console.time('Array')

  arr.push(n)

  console.timeEnd('Array')
  console.time('Set')

  set.add(n)

  console.timeEnd('Set')

  //3 delete
  const deleteFromArr = (arr, item) => {
    let index = arr.indexOf(item)
    return index !== -1 && arr.splice(index, 1)
  }

  console.time('Array')

  deleteFromArr(arr, n)

  console.timeEnd('Array')
  console.time('Set')

  set.delete(n)

  console.timeEnd('Set')
}

checkSet()
