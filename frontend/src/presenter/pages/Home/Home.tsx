import { SearchResult } from '@/domain/searchResult'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@/presenter/components'
import { useEffect, useState } from 'react'
import { Form, Link, useActionData, useSubmit } from 'react-router-dom'

export function HomePage() {
  const submit = useSubmit()
  const [buttonState, setButtonState] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const actionData = useActionData() as SearchResult[]

  useEffect(() => {
    if (actionData) {
      setIsSubmitting(false)
    }
  }, [actionData])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.target as HTMLFormElement)
    submit(formData, { method: 'post' })
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setButtonState(event.target.value.length > 0)
  }

  return (
    <div className="flex gap-6 h-full max-h-full">
      <Card className="flex-1 max-w-96 h-fit">
        <CardHeader>
          <CardTitle className="text-zinc-700">
            What are you searching for?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            onSubmit={(e) => handleSubmit(e)}
            method="post"
            className="flex flex-col gap-3 w-full"
          >
            <RadioGroup
              name="searchType"
              className="flex gap-6"
              defaultValue="people"
            >
              <div className="flex gap-2 items-center">
                <RadioGroupItem id="people-option" value="people" />
                <Label htmlFor="people-option">People</Label>
              </div>
              <div className="flex gap-2 items-center">
                <RadioGroupItem id="movie-option" value="films" />
                <Label htmlFor="movie-option">Movie</Label>
              </div>
            </RadioGroup>

            <Input
              onChange={handleInput}
              name="inputQuery"
              placeholder="e.g. Chewbacca, Yoda, Boba Fett"
            />

            <Button
              disabled={!buttonState}
              variant={!buttonState ? 'secondary' : 'default'}
            >
              {isSubmitting ? 'Searching...' : 'Search'}
            </Button>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex-1 h-full flex-col flex">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">Results</CardTitle>
        </CardHeader>
        <CardContent className="min-h-96 max-h-full">
          {!actionData || actionData.length <= 0 ? (
            <div className="flex items-center justify-center h-64">
              {!isSubmitting ? (
                <b className="text-gray-300 text-center">
                  There are zero matches.
                  <br />
                  Use the form to search for People or Movies.
                </b>
              ) : (
                <b className="text-gray-300 text-center">searching...</b>
              )}
            </div>
          ) : (
            actionData &&
            actionData.length > 0 &&
            actionData.map((obj) => {
              return (
                <div
                  className="flex items-center justify-between pt-4 pb-4"
                  style={{ borderBottom: '1px solid #ccc' }}
                  key={obj.name}
                >
                  <strong className="text-lg">{obj.name}</strong>
                  <Link to={`/detail/${obj.url}`}>
                    <Button>See details</Button>
                  </Link>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
