import { createSignal } from "solid-js"

type NpsTypeProps = {
  title: string
  description?: string
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
  required?: boolean
}

export default function NpsType({
  title,
  description,
  min = 0,
  max = 10,
  minLabel = "Not at all likely",
  maxLabel = "Extremely likely",
  required = false,
}: NpsTypeProps) {
  const [value, setValue] = createSignal<number | null>(null)
  const [error, setError] = createSignal("")

  function handleSubmit(e) {
    e.preventDefault()
    if (required && value() === null) {
      setError("Please select a score.")
    } else {
      setError("")
      // handle valid NPS value here
    }
  }

  return (
    <div class="bg-white rounded-2xl w-full max-w-md mx-auto transition-all duration-300">
      <div class="px-8 py-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
        {description && (
          <p class="text-gray-500 text-base mt-2">{description}</p>
        )}
      </div>
      <div class="px-8 py-6">
        <form class="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-500 text-sm">{minLabel}</span>
              <span class="text-gray-500 text-sm">{maxLabel}</span>
            </div>
            <div class="flex justify-center items-center space-x-1 mt-2">
              {[...Array(max - min + 1)].map((_, i) => {
                const score = min + i
                return (
                  <button
                    type="button"
                    aria-label={`Score ${score}`}
                    class={`w-8 h-8 rounded-full border font-bold text-sm transition-colors duration-150 ${
                      value() === score
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                    onClick={() => setValue(score)}
                  >
                    {score}
                  </button>
                )
              })}
            </div>
            <div class="text-center text-blue-600 font-bold mt-2">
              {value() !== null ? `Selected: ${value()}` : "No score selected"}
            </div>
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