import React from 'react';
import Navbar from './Navbar';
import { CircleAlertIcon } from 'lucide-react'; // Import necessary icons
import { useSelector } from 'react-redux';

const DrugDetailPage = () => {
    // Assuming you are using Redux to store the single drug details
    const singleDrug = useSelector((store) => store.drug.singleDrug);
    
    return (
        <>
            <Navbar />
            {/* Drug Detail Section */}
            <div className='flex flex-col items-center justify-around gap-5 max-w-7xl mx-10 my-5 px-5 py-3 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold'>Drug Details</h1>

                {/* Check if singleDrug exists */}
                {singleDrug ? (
                    <div className='flex flex-col bg-white shadow-lg rounded-lg border border-gray-200 p-5 w-full'>
                        <h3 className="text-bold text-lg font-semibold">RXCUI: {singleDrug.rxcui}</h3>
                        <h3 className="text-lg font-semibold">Drug Name: {singleDrug.name}</h3>
                        <h4 className="text-lg font-semibold">Synonym: {singleDrug.synonym}</h4>
                    </div>
                ) : (
                    <div>
                        <h3 className='flex items-center gap-5'>
                            <span><CircleAlertIcon /></span> No Drug Details Found
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default DrugDetailPage;
