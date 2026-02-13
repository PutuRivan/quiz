import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function StatsCard({ value, label }) {
  return (
    <Card>
      <CardContent>
        <p className='text-3xl font-bold text-center'>{value}</p>
        <p className='text-center'>{label}</p>
      </CardContent>
    </Card>
  )
}
