import { createSignal } from "solid-js"

type HeartRatingTypeProps = {
  title: string
  description?: string
  min?: number
  max?: number
  required?: boolean
}

export default function HeartRatingType({
  title,
  description,
  min = 1,
  max = 5,
  required = false,
}: HeartRatingTypeProps) {
  const [value, setValue] = createSignal(0)
  const [error, setError] = createSignal("")

  function handleSubmit(e) {
    e.preventDefault()
    if (required && value() < min) {
      setError("Please select a rating.")
    } else {
      setError("")
      // handle valid rating here
    }
  }

  return (
    <div class="bg-white rounded-2xl w-full max-w-md mx-auto transition-all duration-300 mb-6">
      <div class="px-8 py-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
        {description && <p class="text-gray-500 text-base mt-2">{description}</p>}
      </div>
      <div class="px-8 py-6">
        <form class="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div class="flex justify-center items-center space-x-2 mt-2">
            {[...Array(max)].map((_, i) => (
              <button
                type="button"
                aria-label={`Rate ${i + 1}`}
                class="focus:outline-none"
                onClick={() => setValue(i + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class={`h-8 w-8 ${value() >= i + 1 ? "text-pink-500" : "text-gray-300"}`}
                  fill={value() >= i + 1 ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>
            ))}
          </div>
          <div class="text-center text-pink-600 font-bold mt-2">
            {value() > 0 ? value() : "No rating"}
          </div>
          {error() && <p class="text-red-500 text-sm mt-2">{error()}</p>}
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
              class="bg-pink-500 text-white px-4 py-3 rounded-lg shadow font-semibold text-lg hover:bg-pink-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}