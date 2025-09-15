import { createSignal } from "solid-js"

type MultipleChoiceProps = {
  title: string
  description?: string
  options: string[]
  required?: boolean
  displayMode?: "checkbox" | "list"
}

export default function MultipleChoice({
  title,
  description,
  options,
  required = false,
  displayMode = "checkbox",
}: MultipleChoiceProps) {
  const [selected, setSelected] = createSignal<string[]>([])
  const [error, setError] = createSignal("")

  function toggleOption(option: string) {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (required && selected().length === 0) {
      setError("Please select at least one option.")
    } else {
      setError("")
      // handle valid selection here
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
          <div>
            {displayMode === "checkbox" ? (
              <div class="space-y-2">
                {options.map(option => (
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="multiple-choice"
                      value={option}
                      checked={selected().includes(option)}
                      onChange={() => toggleOption(option)}
                      class="form-checkbox text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <ul class="divide-y divide-gray-200">
                {options.map(option => (
                  <li
                    class={`py-2 px-4 cursor-pointer hover:bg-blue-100 rounded ${
                      selected().includes(option) ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
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