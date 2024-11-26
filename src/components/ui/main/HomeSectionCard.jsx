const HomeSectionCard = ({ id, title, desc }) => {
  return (
    <div className="p-4 rounded-md shadow-md max-w-xs min-h-60 flex flex-col items-center justify-center text-center">
      <h3 className={`text-4xl ${id === 1 ? 'text-orange-300' : id === 2 ? 'text-blue-300' : 'text-red-300'}`}>
        {title}
      </h3>
      <p className="break-keep mt-3">{desc}</p>
    </div>
  )
}

export default HomeSectionCard
