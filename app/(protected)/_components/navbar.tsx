'use client'
import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const Navbar = () => {
  const Pathname = usePathname();
    return (
        <nav className="bg-secondary flex justify-between 
       items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
            <Button 
                 asChild
                 variant={Pathname ==='/server' ? 'default' : 'outline'}
                 >
                    <Link href='/server'>
                        Server
                    </Link>
                 </Button>
            <Button 
                 asChild
                 variant={Pathname === '/client' ? 'default' : 'outline'}
                 >
                    <Link href='/client'>
                        Client
                    </Link>
                 </Button>
            <Button 
                 asChild
                 variant={Pathname ==='/admin' ? 'default' : 'outline'}
                 >
                    <Link href='/admin'>
                       Admin
                    </Link>
                 </Button>
                 <Button 
                 asChild
                 variant={Pathname ==='/settings' ? 'default' : 'outline'}
                 >
                    <Link href='/settings'>
                        Settings
                    </Link>
                 </Button>
            </div>
            
            <UserButton/>
        </nav>
    )
}
