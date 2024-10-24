import React from 'react'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'

const Card = () => {
  return (
    <div className='flex flex-col items-start gap-5 p-4 bg-white shadow-lg rounded-lg border border-gray-200 mb-4 w-34 h-40'>
        <h3 className="text-bold text-lg font-semibold">Rxn ID: RXN_ID</h3>
        <h3 className="text-lg font-semibold mr-2"> Drug Name: Drug_Name </h3>
        <Button> <SearchIcon /> </Button>
    </div>
  )
}

export default Card