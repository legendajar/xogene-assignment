import React from 'react';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';
import { setSingleDrug } from '@/redux/drugsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = ({ key, data }) => {  // Removed index prop, as it’s not used
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const singleDrugHandler = () => {
        dispatch(setSingleDrug(data))
        navigate(`/drugs/${data.name}`)
    }
    return (
        <div className='flex flex-col items-start gap-3 p-4 bg-white shadow-lg rounded-lg border border-gray-200 mb-4'>
        <h3 className="text-lg font-semibold">Rxn ID: {data.rxcui}</h3>
        <h3 className="text-md font-semibold text-gray-700">Drug Name: {data.name}</h3>
        <Button onClick={singleDrugHandler} className='flex items-center gap-2'>
            <SearchIcon />
            Search
        </Button>
        </div>
    );
};

export default Card;
