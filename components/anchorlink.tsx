import { usePathname, useRouter } from 'next/navigation'

 export function AnchorLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') {
      e.preventDefault()
      router.push(`/${href}`)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-white hover:text-[#E4E4E4] px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-[#00A896]' : ''
      }`}
    >
      {children}
    </a>
  )
}
