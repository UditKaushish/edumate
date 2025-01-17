import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Image
            src="/placeholder.svg"
            alt="StoryBot Logo"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">StoryBot</h1>
          <p className="text-white/90 text-lg mt-2">Where imagination comes to life!</p>
        </div>
        {children}
      </div>
    </div>
  )
}

