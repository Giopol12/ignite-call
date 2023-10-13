import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const username = String(req.query.username)
  const { year, mounth } = req.query
  if (!year || !mounth) {
    return res.status(400).json({ message: 'Year or month not specifiedyear' })
  }
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const availabilityWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })
  return res.json({ possibleTimes, availableTimes })
}
