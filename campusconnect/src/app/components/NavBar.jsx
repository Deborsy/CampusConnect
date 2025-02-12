import React from 'react';
import Link from 'next/link';
import { Bell, PlusCircleIcon, UserCircleIcon } from "lucide-react";

const NavBar = ()=>{
    return(
        <div className="p-3 flex flex-row justify-between items-center w-full h-16 bg-green-800 ">
            <div className="text-white font-bold"><a href="/">CampusConnect</a></div>
                <ul className='flex flex-row'>
                    <li className='mx-4'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='mx-4'>
                        <div className="relative">
                            <Bell size={24} className="text-white" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </div>
                    </li>
                    <li className='mx-4'>
                        <Link href='/Event'><UserCircleIcon size={24} className='text-white'/></Link>
                    </li>
                    <li className='mx-4'>
                        <Link href='/create-event'>
                            <PlusCircleIcon size={24} className="w-5 h-5 text-white"/>
                        </Link>
                    </li>
                </ul>
        </div>
    )
}
export default NavBar;