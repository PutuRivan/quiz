import React, { useEffect, useState } from 'react'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useQuiz } from '@/hooks/use-quiz'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function NewQuizForm() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: '10',
      duration: '10',
      category: '9',
      difficulty: 'easy'
    }
  })
  const {
    fetchQuestions,
    loading,
    startQuiz,
  } = useQuiz()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json()
        setCategories(data.trivia_categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, []);

  const onSubmit = async (data) => {
    const durationInSeconds = parseInt(data.duration)
    const response = await fetchQuestions(data.amount, data.category, data.difficulty)
    if (response.success) {
      startQuiz({
        amount: data.amount,
        category: data.category,
        difficulty: data.difficulty,
        duration: durationInSeconds
      })
      navigate('/quiz')
      toast.success('Quiz started successfully')
    } else {
      toast.error('Failed to start quiz')
    }
  }

  return (
    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Number of Questions */}
          <Controller
            name="amount"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Number of Questions</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            )}
          />
          {/* Duration */}
          <Controller
            name="duration"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Duration</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Category */}
          <Controller
            name="category"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          {/* Difficulty */}
          <Controller
            name="difficulty"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Difficulty</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
            )}
          />
        </div>
      </FieldGroup>
      <Button
        type="submit"
        className='w-full'
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Start Quiz'}
      </Button>
    </form>
  )
}