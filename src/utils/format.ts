import type { Ref } from 'vue'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)
dayjs.extend(weekday)

export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}

export function camelToHyphen(name: string) {
  return name.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

// function forwardEventsUtils
// params: emits, array[string] string全是eventsName
// 响应回来的是一个对象
export function forwardEventsUtils(emits: any, arr: string[], prefix: string = '') {
  const forwardEvents: Record<string, (...args: any[]) => void> = {}

  arr.forEach((eventName) => {
    const name = kebabToCamel(eventName)
    forwardEvents[name] = (...args: any[]) => {
      emits(prefix + eventName, ...args)
    }
  })

  return forwardEvents
}

export function exposeEventsUtils(ref: Ref<any>, arr: string[]) {
  const exposeMethods: Record<string, Function> = {}

  arr.forEach((exposeName) => {
    // e.g.
    // tableRef.value.clearSelection()
    // obj = { clearSelection: () => tableRef.value.clearSelection()}
    exposeMethods[exposeName] = (...args: any[]) => {
      if (ref.value && typeof ref.value[exposeName] === 'function') {
        return ref.value[exposeName](...args)
      } else {
        return ref.value[exposeName]
      }
    }
  })

  return exposeMethods
}

/**
 * Formats the given number of seconds into a string representing the time in the format HH:MM:SS.
 *
 * @param {number} seconds - The number of seconds to format.
 * @return {string} The formatted time string in the format HH:MM:SS.
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.round(seconds % 60)

  let formattedTime = ''

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, '0')
    formattedTime += `${formattedHours}:`
  }

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')

  formattedTime += `${formattedMinutes}:${formattedSeconds}`

  return formattedTime
}

export function calculateGrade(score) {
  let grade = ''

  switch (true) {
    case score >= 100:
      grade = 'A+'
      break
    case score >= 93.33:
      grade = 'A'
      break
    case score >= 86.67:
      grade = 'A-'
      break
    case score >= 80:
      grade = 'B+'
      break
    case score >= 73.33:
      grade = 'B'
      break
    case score >= 66.67:
      grade = 'B-'
      break
    case score >= 60:
      grade = 'C+'
      break
    case score >= 53.33:
      grade = 'C'
      break
    case score >= 46.67:
      grade = 'C-'
      break
    case score >= 40:
      grade = 'D+'
      break
    case score >= 33.33:
      grade = 'D'
      break
    case score >= 26.67:
      grade = 'D-'
      break
    case score >= 20:
      grade = 'E+'
      break
    case score >= 13.33:
      grade = 'E'
      break
    default:
      grade = 'E-'
  }

  return grade
}

// 对比两个时间
export function shouldDisplayTime(created: string, lastCreated?: string) {
  if (!lastCreated) return true

  const current = dayjs(created)
  const last = dayjs(lastCreated)
  return current.diff(last, 'minute') >= 3
}

// 格式化时间
export function formatMessageTime(messageTime: string) {
  // 分成：a.24小时内 b.一周内 c.一年内 d.超过1年的
  const now = dayjs()

  const msgTime = dayjs(messageTime)

  if (msgTime.isSame(now, 'day')) {
    // 当天的消息
    return msgTime.format('HH:mm')
  } else if (msgTime.isSame(now.subtract(1, 'day'), 'day')) {
    // 昨天的消息
    return '昨天 ' + msgTime.format('HH:mm')
  } else if (msgTime.isSame(now, 'week')) {
    // 本周内的消息
    return msgTime.format('dddd HH:mm')
  } else if (msgTime.isSame(now, 'year')) {
    // 今年的消息，超过1周的
    return msgTime.format('MM月DD日 HH:mm')
  } else {
    // 跨年的消息
    return msgTime.format('YYYY年MM月DD日 HH:mm')
  }
}
