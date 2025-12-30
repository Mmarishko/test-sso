import { trace } from 'console'

let url =
  'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits'

function getCommit() {
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data[0] || {}))
    .catch((error: Error) => console.log(error.message))
    .finally(() => console.log('finally'))
}

export async function getCommits(): Promise<void> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      // обработка ошибок
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()

    console.log(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error?.message)
    }
  }
}

interface PostInterface {
  type: string
  text: string
}

async function get(url: string): Promise<unknown> {
  const reqHeaders = new Headers()
  //  {
  //     accept: 'application/json',
  //     'accept-language': 'en-US,en;q=0.5,ru-RU,ru;q=0.9',
  //     'content-type': 'application/json; charset=UTF-8',
  //     'cache-control':' maxAge=36000'
  //   }

  reqHeaders.append('accept', 'application/json')
  reqHeaders.append('cache-control', ' maxAge=36000')

  const options: RequestInit = {
    method: 'GET',
    headers: reqHeaders,
    mode: 'cors',
  }

  const request = new Request(url, options)

  try {
    const response = await fetch(request)

    if (!response.ok)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)

    return await response.json()
  } catch (error) {
    console.log('Oшибка: ', error)
  }
}

async function post(url: string, body?: PostInterface): Promise<unknown> {
  const options: RequestInit = {
    method: 'POST', // GET, PUT, DELETE
    headers: {
      accept: 'application/json, text/html', // хотим получить
      'accept-language': 'en-US,en;q=0.5,ru-RU,ru;q=0.9',
      'content-type': 'application/json; charset=UTF-8', // отправляем в запросе
    },
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include - отправлять куки, *same-origin - Только если origin совпадает с текущим сайтом, omit - никогда  (по умолчанию в fetch)
    body: JSON.stringify(body),
  }
  try {
    const response = await fetch(url, options)

    // console.log('response', response)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const contentType = response.headers
      .get('content-type')
      ?.split(';')[0]
      .trim()

    let result: unknown

    if (contentType?.startsWith('application/json')) {
      result = await response.json()
    } else if (
      contentType?.startsWith('text/') ||
      contentType === 'application/x-www-form-urlencoded'
    ) {
      result = await response.text()
    } else if (contentType?.startsWith('image/')) {
      result = await response.blob()
    } else {
      result = await response.arrayBuffer()
    }

    return result
  } catch (error) {
    if (error instanceof Error) {
      console.log('Ошибка запроса: ', error.message)
    } else {
      console.log('Неизвестная ошибка: ', error)
    }

    throw error
  }
}

// getCommit()
// getCommits()
;(async () => {
  const result = await post('https://jsonplaceholder.typicode.com/posts', {
    type: '123',
    text: '123123123123123123',
  })
  console.log('1', result)
})()

function xhrReq(url: string) {
  const xhr = new XMLHttpRequest()

  //xhr.open(method, URL, [async, user, password])
  xhr.open('GET', url)

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText))
    }
  }

  xhr.onerror = () => {
    console.log('Ошибка')
  }

  xhr.send()
}

xhrReq('https://jsonplaceholder.typicode.com/posts')
