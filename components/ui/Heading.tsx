

export default function Heading({children}: {children: React.ReactNode}) {
  return (
    <h1 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        {children}
    </h1>
  )
}
