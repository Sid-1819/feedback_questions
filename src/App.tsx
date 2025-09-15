import { createSignal, createMemo } from "solid-js"
import RatingType from "./RatingType"
import NpsType from "./NpsType"
import MultipleChoice from "./MultipleChoice"
import SingleChoice from "./SingleChoice"
import HeartRatingType from "./HeartRatingType"
import LongAnswer from "./LongAnswer"

type ShortAnswerProps = {
  title: string
  description?: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

function ShortAnswer({
  title,
  description,
  required = false,
  minLength = 0,
  maxLength = 100,
}: ShortAnswerProps) {
  const [answer, setAnswer] = createSignal("")
  const [error, setError] = createSignal("")
  const [submitted, setSubmitted] = createSignal(false)



  return (
    <div class="bg-white rounded-2xl w-full max-w-md mx-auto transition-all duration-300">
      <div class="px-8 py-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
        {description && (
          <p class="text-gray-500 text-base mt-2">{description}</p>
        )}
      </div>
      <div class="px-8 py-6">
        <form class="space-y-6">
          <div>
            <input
              id="question"
              type="text"
              placeholder="Type your answer..."
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={answer()}
              onInput={e => setAnswer(e.target.value)}
              aria-required={required}
              minLength={minLength}
              maxLength={maxLength}
            />
            <p class="text-gray-400 text-xs mt-1">
              Min {minLength} / Max {maxLength} characters
            </p>
            {error() && (
              <p class="text-red-500 text-sm mt-2">{error()}</p>
            )}
          </div>
          <div class="flex justify-between">
            <button
              type="button"
              class="bg-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow font-semibold text-lg hover:bg-gray-400 transition duration-200"
              onClick={() => alert("Previous clicked")}
            >
              Previous
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-3 rounded-lg shadow font-semibold text-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div class="min-h-screen grid grid-cols-3 items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 p-4">
      <ShortAnswer
        title="What is your favorite color?"
        description="Please answer honestly and briefly."
        required={true}
        minLength={3}
        maxLength={20}
      />
      <RatingType
        title="How would you rate our service?"
        description="1 is worst, 5 is best."
        min={1}
        max={5}
        minLabel="Worst"
        maxLabel="Best"
        required={true}
      />
      <NpsType
  title="How likely are you to recommend us to a friend?"
  description="0 means not at all likely, 10 means extremely likely."
  min={0}
  max={10}
  minLabel="Not at all likely"
  maxLabel="Extremely likely"
  required={true}
/>
<SingleChoice
  title="Pick one fruit"
  description="Select your favorite fruit."
  options={["Apple", "Banana", "Orange"]}
  required={true}
  displayMode="radio" // or "list"
/>
<MultipleChoice
  title="Pick your hobbies"
  description="Select all that apply."
  options={["Reading", "Traveling", "Gaming", "Cooking"]}
  required={true}
  displayMode="list" // or "list"
/>
<HeartRatingType
  title="How much do you love our product?"
  description="Tap a heart to rate your love!"
  min={1}
  max={5}
  required={true}
/>
<LongAnswer
  title="Tell us more about your experience"
  description="Share your thoughts in detail."
  required={true}
  minLength={20}
  maxLength={500}
/>
    </div>
  )
}