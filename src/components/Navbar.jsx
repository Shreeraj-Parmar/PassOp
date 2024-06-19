import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-700 h-[7vh] flex justify-between text-white px-8 items-center'>
            <div className="logo  text-2xl font-bold">
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <ul>
                <li className='flex gap-4'>
                    <a href='' className='hover:font-bold hover:text-black' >Home</a>
                    <a href='' className='hover:font-bold hover:text-black' >About</a>
                    <a href='' className='hover:font-bold hover:text-black' >Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
