export {}
function solution(list: number[]) {
  // TODO: complete solution

  let result: string = ''
  let currentRange: number[] = []

  for (let i = 0; i < list.length; i++) {
    currentRange.push(list[i])

    const diff = Math.abs(list[i + 1] - list[i])

    if (diff > 1 || i === list.length - 1) {
      result += currentRange[0].toString()

      if (currentRange.length === 2) {
        result += ',' + currentRange[currentRange.length - 1]
      } else if (currentRange.length > 1) {
        result += '-' + currentRange[currentRange.length - 1]
      }

      if (i !== list.length - 1) result += ','

      currentRange = []
    }
  }

  return result
}

solution([
  -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
])

// TODO: create the User class/object
// it must support rank, progress and the incProgress(rank) method
interface UserInt {
  rank: number
  progress: number
  incProgress(activityRank: number): void
}

class UserClass implements UserInt {
  rank: number
  progress: number

  constructor() {
    this.rank = -8
    this.progress = 0
  }

  private normalizeRank(rank: number): number {
    if (rank < -8 || rank > 8 || rank === 0) {
      throw new Error('Invalid rank')
    }
    return rank > 0 ? rank - 1 : rank
  }

  private getNextRank(currentRank: number): number {
    if (currentRank === -1) return 1 // пропускаем 0
    if (currentRank >= 1 && currentRank < 8) return currentRank + 1
    if (currentRank < -1) return currentRank + 1
    return 8 // достигли максимума
  }

  incProgress(activityRank: number) {
    // Валидация входного ранга
    if (activityRank < -8 || activityRank > 8 || activityRank === 0) {
      throw new Error('Rank is invalid')
    }

    const diff =
      this.normalizeRank(activityRank) - this.normalizeRank(this.rank)

    let points = 0
    if (diff >= 1) {
      points = 10 * diff * diff
    } else if (diff === 0) {
      points = 3
    } else if (diff === -1) {
      points = 1
    }

    this.progress += points

    while (this.progress >= 100 && this.rank < 8) {
      this.progress -= 100
      this.rank = this.getNextRank(this.rank)
    }

    if (this.rank === 8) this.progress = 0
  }
}

const userProgress = new UserClass()
// user.incProgress(-8)
// console.log(user.rank, ' ', user.progress) //assert(-8, -8, 3)

// user = new UserClass()
// user.incProgress(-7)
// console.log(user.rank, ' ', user.progress) // assert(-7, -8, 10)

// user = new UserClass()
// user.incProgress(-6)
// console.log(user.rank, ' ', user.progress) // assert(-6, -8, 40)

// user = new UserClass()
// user.incProgress(-5)
// console.log(user.rank, ' ', user.progress) // assert(-5, -8, 90)

// user = new UserClass()
// user.incProgress(-4)
// console.log(user.rank, ' ', user.progress) //assert(-4, -7, 60)

// user = new UserClass()
// console.log(user.rank, ' ', user.progress)
// user.incProgress(-2)

// user = new UserClass()
// user.incProgress(-8)
// console.log(user.rank, ' ', user.progress) // assert(-8, -8, 3)

// user = new UserClass()
userProgress.rank = -2
userProgress.incProgress(1)
console.log(userProgress.rank, ' ', userProgress.progress) // assert(1, -2, 40)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) // assert(1, -2, 40)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -2, 40)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -2, 80)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -2, 80)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -2, 80)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -1, 20)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -1, 30)
// user.incProgress(1)
// console.log(user.rank, ' ', user.progress) //assert(1, -1, 40)

// user.incProgress(2)
// console.log(user.rank, ' ', user.progress) //assert(2, -1, 80)
// user.incProgress(2)
// console.log(user.rank, ' ', user.progress) //assert(2, 1, 20)
// user.incProgress(-1)
// console.log(user.rank, ' ', user.progress) //assert(-1, 1, 21)
// user.incProgress(3)
// console.log(user.rank, ' ', user.progress) //assert(3, 1, 61)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 6, 51)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 6, 91)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 31)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 41)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 51)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 61)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 71)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 81)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 7, 91)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 8, 0)
// user.incProgress(8)
// console.log(user.rank, ' ', user.progress) //assert(8, 8, 0)

function orderWeight(string) {
  const inputArr = string
    .trim()
    .split(' ')
    .sort((a, b) => {
      const first = a.split('').reduce((acc, item) => acc + Number(item), 0)
      const second = b.split('').reduce((acc, item) => acc + Number(item), 0)

      if (first !== second) {
        return first < second
      } else {
        return a < b
      }
    })
}

type RGB = 'red' | 'green' | 'blue'
type UserTheme = { primary: RGB; secondary: string }

const theme = {
  primary: 'green',
  secondary: '#ff0000',
  // accent: 'gold', // Ой! Этого поля нет в UserTheme
} satisfies UserTheme
