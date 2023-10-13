import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}
type CalendarWeeks = CalendarWeek[]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMounth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMounth() {
    const previusMountDate = currentDate.subtract(1, 'month')
    setCurrentDate(previusMountDate)
  }
  function handleNextMounth() {
    const nextMountDate = currentDate.add(1, 'month')
    setCurrentDate(nextMountDate)
  }

  const calendarWeeks = useMemo(() => {
    const daysInMounthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    const firstWeekDay = currentDate.get('day')

    const previousMounthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMounth = dayjs().set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastDayWeek = lastDayInCurrentMounth.get('day')

    const nextMounthFillArray = Array.from({
      length: 7 - (lastDayWeek + 1),
    }).map((_, i) => {
      return lastDayInCurrentMounth.add(i + 1, 'day')
    })

    // const lastDayWeek = currentDate.daysInMonth()

    // const nextMounthFillArray = Array.from({
    //   length: 42 - lastDayWeek + firstWeekDay,
    // }).map((_, i) => {
    //   const lastDayMounth = dayjs().set('date', lastDayWeek)
    //   return lastDayMounth.add(i + 1, 'day')
    // })

    const calendarDays = [
      ...previousMounthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMounthArray.map((date) => {
        return {
          date,
          disabled: false,
        }
      }),
      ...nextMounthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMounth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMounth} title="Previous Mounth">
            <CaretLeft />
          </button>
          <button onClick={handleNextMounth} title="Next Mounth">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ days, week }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay>{date}</CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
