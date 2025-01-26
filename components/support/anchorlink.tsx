import { usePathname } from "next/navigation";
import {useRouter} from 'next/navigation'
export default function AnchorLink({ href, active, children, onClick }: { href: string; active: boolean; children: React.ReactNode; onClick?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
  
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== '/') {
        e.preventDefault();
        router.push(`/${href}`);
      }
      if (onClick) onClick();
    };
  
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`text-white hover:text-[#E4E4E4] px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-[#00A896]' : ''}`}
      >
        {children}
      </a>
    );
  }