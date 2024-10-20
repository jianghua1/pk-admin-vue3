import 'dotenv/config'

const whiteStr = process.env.MOCK_WHITELIST
const whiteArr = whiteStr?.split(',') || []

export function filterUrl(arr) {
  return arr.filter((item) => !whiteArr.some((o) => o === item.url))
}
