'use client'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
    { name: 'Solution', href: '#' },
    { name: 'Login', href: '/sign-in' },
    // { name: 'Signup', href: '/sign-up' },
]

export default function Nav () {
    return (
        <nav className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <Logo />
                                </Link>

                                <button
                                
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                   </ul>
                                </div>
                               <div className='lg:pr-4 w-full'>
                                 <DropdownMenu>
                                  <DropdownMenuTrigger>Register</DropdownMenuTrigger>
                                   <DropdownMenuContent>
                                     <Link href="/sign-up">
                                      <DropdownMenuItem>Head</DropdownMenuItem>
                                     </Link>
                                     <DropdownMenuSeparator />
                                     <Link href="/sign-up">
                                      <DropdownMenuItem>Manager</DropdownMenuItem>
                                     </Link>
                                     <DropdownMenuSeparator />
                                     <Link href="/sign-up">
                                      <DropdownMenuItem>Mentor</DropdownMenuItem>
                                     </Link>
                                     <DropdownMenuSeparator />
                                     <Link href="/sign-up">
                                      <DropdownMenuItem>Students</DropdownMenuItem>
                                     </Link>
                                   </DropdownMenuContent>
                                 </DropdownMenu>
                               </div>
                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                   <UserButton/>
                                   <ModeToggle/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </nav>
    )
}