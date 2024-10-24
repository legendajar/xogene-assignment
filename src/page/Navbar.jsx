import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-16 bg-bodyColor'>
        <div className="flex items-center">
            <h3 className="text-2xl uppercase font-bold text-designColor px-5 py-4">
                XOGENE
            </h3>
            <div className="text-center">
                <Link to='/drugs/search'>
                    <h4 className='text-center text-designColor font-titleFonts'> Search Drugs </h4>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar