import React, { useState } from 'react';
import Navbar from './Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleAlertIcon, SearchIcon, Loader2Icon } from 'lucide-react'; // Added loader icon
import Card from '@/components/Card/Card';
import axios from 'axios';

const DrugSearchPage = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);  // State for search results
    const [suggestions, setSuggestions] = useState([]);      // State for suggestions
    const [noResults, setNoResults] = useState(false);       // State for handling no results
    const [loading, setLoading] = useState(false);           // Loading state

    const changeInputHandler = (e) => {
        setInput(e.target.value);
    };

    const suggestionSearch = async (suggestion) => {
        setInput(suggestion); // Update the input with the clicked suggestion
        await submitHandler(); // Perform the search for the selected suggestion
    };

    // Debounced API request for suggestions
    const suggestionAPI = async(input) => {
        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${input}`);
            
            const suggestionGroup = res.data.suggestionGroup;
            if (suggestionGroup?.suggestionList?.suggestion?.length > 0) {
                return suggestionGroup.suggestionList.suggestion;
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);
            return []; // Return an empty array if there's an error
        }
    };
    
    const submitHandler = async(e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setNoResults(false);
        setSearchResults([]);
        setSuggestions([]);

        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${input}`);
            const conceptGroup = res.data.drugGroup.conceptGroup;

            if (conceptGroup && conceptGroup.length > 0 && conceptGroup[1]?.conceptProperties) {
                setSearchResults(conceptGroup[1].conceptProperties);  // Set the search results to the state
            } else {
                // If no drugs are found, call the suggestions API
                const suggestions = await suggestionAPI(input);
                if (suggestions.length === 0) {
                    setNoResults(true);  // No suggestions found
                } else {
                    setSuggestions(suggestions);  // Set suggestions to the state
                }
            }
        } catch (err) {
            console.log(err);
            alert('Error fetching drugs.');
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    return (
        <>
            <Navbar />
            {/* Drugs Search Section */}
            <div className='flex flex-col items-center justify-around gap-5 max-w-7xl mx-10 my-5 px-5 py-3 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold'>Search Drugs</h1>

                {/* Search Box */}
                <form onSubmit={submitHandler} className='w-full flex items-center'>
                    <Input
                        type='text'
                        value={input}
                        onChange={changeInputHandler}
                        placeholder="Enter the drug name..."
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
                    </Button>
                </form>

                {/* Loading State */}
                {loading && <div className="text-lg font-bold">Searching...</div>}

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className='flex items-center gap-4'>
                        {searchResults.map((result, index) => (
                            <Card key={index} data={result} />
                        ))}
                    </div>
                )}

                {/* Suggestions if no direct results */}
                {suggestions.length > 0 && (
                    <div className='border p-5 bg-gray-200 text-black font-bold rounded-md'>
                        <h3>Did you mean:</h3>
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => suggestionSearch(suggestion)} // Use an arrow function to prevent immediate execution
                                    className='cursor-pointer hover:text-blue-500'
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* No Results Found */}
                {noResults && (
                    <div>
                        <h3 className='flex items-center gap-5'>
                            <span><CircleAlertIcon /></span> No Drugs Found 
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default DrugSearchPage;
