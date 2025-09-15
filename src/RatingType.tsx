import { createSignal } from "solid-js"

type RatingTypeProps = {
  title: string
  description?: string
  min: number
  max: number
  minLabel?: string
  maxLabel?: string
  required?: boolean
}

export default function RatingType({
  title,
  description,
  min,
  max,
  minLabel = "Min",
  maxLabel = "Max",
  required = false,
}: RatingTypeProps) {
  const [value, setValue] = createSignal(0)
  const [error, setError] = createSignal("")

  return (
    <div class="bg-white rounded-2xl w-full max-w-md mx-auto transition-all duration-300">
      <div class="px-8 py-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
        {description && (
          <p class="text-gray-500 text-base mt-2">{description}</p>
        )}
      </div>
      <div class="px-8 py-6">
        <form class="space-y-6"  >
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-500 text-sm">{minLabel}</span>
              <span class="text-gray-500 text-sm">{maxLabel}</span>
            </div>
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
                    class={`h-8 w-8 ${value() >= i + 1 ? "text-yellow-400" : "text-gray-300"}`}
                    fill={value() >= i + 1 ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.904-1.002L12 2.75l3.096 6.003L22 9.755l-5.007 4.36 1.179 6.88z"
                    />
                  </svg>
                </button>
              ))}
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