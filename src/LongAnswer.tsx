import { createSignal } from "solid-js"

type LongAnswerProps = {
  title: string
  description?: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

export default function LongAnswer({
  title,
  description,
  required = false,
  minLength = 20,
  maxLength = 500,
}: LongAnswerProps) {
  const [answer, setAnswer] = createSignal("")
  const [error, setError] = createSignal("")
  const [submitted, setSubmitted] = createSignal(false)

 

  return (
    <div class="bg-white rounded-2xl w-full max-w-md mx-auto transition-all duration-300 mb-6">
      <div class="px-8 py-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
        {description && <p class="text-gray-500 text-base mt-2">{description}</p>}
      </div>
      <div class="px-8 py-6">
        <form class="space-y-6"  >
          <div>
            <textarea
              id="long-answer"
              placeholder="Type your answer..."
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px]"
              value={answer()}
              onInput={e => setAnswer(e.target.value)}
              aria-required={required}
              minLength={minLength}
              maxLength={maxLength}
            />
            <p class="text-gray-400 text-xs mt-1">
              Min {minLength} / Max {maxLength} characters
            </p>
            {error() && <p class="text-red-500 text-sm mt-2">{error()}</p>}
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