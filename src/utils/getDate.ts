import { DateTime } from 'luxon'

export function getCurrentDate() {
  const dateNow = DateTime.now().toISO()
  const currentDateSplit = dateNow.split('T')
  const currentDate = currentDateSplit[0]
  const currentTimeSplit = currentDateSplit[1].split('.')
  const mountReceived = `${currentDate}T${currentTimeSplit[0]}.000Z`
  return DateTime.fromISO(mountReceived).toJSDate()
}

export function getDatePlus5Minutes() {
  const dateNow = DateTime.now().plus({ minutes: 5 }).toISO()
  const currentDateSplit = dateNow.split('T')
  const currentDate = currentDateSplit[0]
  const currentTimeSplit = currentDateSplit[1].split('.')
  const mountReceived = `${currentDate}T${currentTimeSplit[0]}.000Z`
  return DateTime.fromISO(mountReceived).toJSDate()
}
