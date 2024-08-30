import './globals.css'
import FileUpload from '@/components/FileUpload'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-950 via-zinc-900 to-zinc-800">
      <div className='flex flex-col items-center justify-start p-6 space-y-6'>
        <h1 className="text-primary text-4xl md:text-6xl lg:text-8xl font-extrabold text-center tracking-tight">
          TestifyNotes <span className='text-2xl md:text-4xl lg:text-6xl'> 📝 </span>
        </h1>
        <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-medium text-center tracking-wide">
          Upload your notes, get a curated practice exam in seconds.
        </h2>
      </div>
      <FileUpload />
    </div>
  )
}
