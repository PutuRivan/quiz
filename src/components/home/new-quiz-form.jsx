import React from 'react'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

export default function NewQuizForm() {
  return (
    <form className='space-y-8'>
      <FieldGroup>
        <div className='grid grid-cols-2 gap-4'>
          {/* Number of Questions */}
          <Field>
            <FieldLabel>Number of Questions</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          {/* Duration */}
          <Field>
            <FieldLabel>Duration</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {/* Category */}
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="general-knowledge">General Knowledge</SelectItem>
                  <SelectItem value="entertainment-books">Entertainment: Books</SelectItem>
                  <SelectItem value="entertainment-film">Entertainment: Film</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          {/* Difficulty */}
          <Field>
            <FieldLabel>Difficulty</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>
      <Button type="submit" className='w-full'>Start Quiz</Button>
    </form>
  )
}