import { useState } from 'react'

import { questions } from '../../data/question'

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill({ type: '', answer: '' }))

  const handleChange = (index, value) => {
    const newAnswers = [...answers]
    newAnswers[index] = { type: questions[index].type, answer: value }
    setAnswers(newAnswers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(answers)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold text-lg mb-3">
            <span className="mr-1">{q.id}.</span>
            {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                  answers[index]?.answer === option ? 'bg-gray-100' : ''
                } hover:bg-gray-100`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index]?.answer === option}
                  onChange={() => handleChange(index, option)}
                  className="mr-2 text-primary-color"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-slate-400 text-white py-3 rounded-lg font-semibold hover:bg-slate-500 transition duration-300 hover:text-white"
      >
        제출하기
      </button>
    </form>
  )
}

export default TestForm
