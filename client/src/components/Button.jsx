export default function Button({ text, color }) {
  let colorClass = ''
  switch (color) {
    case 'red':
      colorClass = 'bg-pink-400'
      break
    case 'yellow':
      colorClass = 'bg-amber-300'
      break
    case 'blue':
      colorClass = 'bg-indigo-400'
      break
    case 'green':
      colorClass = 'bg-teal-500'
      break
  }
  return (
    <button
      className={`font-bold rounded-full ${colorClass} py-2.5 px-6 shadow-none hover:shadow-weird border-2 border-black transform hover:-translate-y-1 hover:-translate-x-1 transition`}
    >
      {text}
    </button>
  )
}
