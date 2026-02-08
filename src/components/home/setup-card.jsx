import React from 'react'
import { Card, CardContent } from '../ui/card'

export default function SetupCard({ title, value }) {
  return (
    <Card>
      <CardContent>
        <h3 className='text-xl font-bold text-center'>{title}</h3>
        <p className='text-center'>{value}</p>
      </CardContent>
    </Card>
  )
}
