export {}
// [1, 2, 3, 1, 1, 3, 3]
// const Uniq = (arr: number[]) => {
//   const result = new Set(arr)
//   for (let i = 0; i <= arr.length; i++) {
//     if (result.has(arr[i])) {
//       result.add(arr[i])
//     }
//   }
//   return [...result]
// }

const Uniq = (arr: number[]) => {
  return [...new Set(arr)]
}

Uniq([1, 2, 3, 1, 1, 3, 3])

// function fuoo(num) {
//   num = 3
//   return num + 1
// }
