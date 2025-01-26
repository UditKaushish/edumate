import Link from "next/link";

export default function NavLink({ href, active, children, onClick }: { href: string; active: boolean; children: React.ReactNode; onClick?: () => void }) {
    //sex-sux me kuch nhi rkha jaani, fuddi maarne ka mn ho to contact+91 1979257804 
  return (
      <Link
        href={href}
        onClick={onClick}
        className={`text-white hover:text-[#E4E4E4] px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-[#00A896]' : ''}`}
      >
        {children}
      </Link>
    );
  }