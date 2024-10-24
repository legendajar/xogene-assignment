import React, { useState } from 'react';
import Navbar from './Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleAlertIcon, SearchIcon } from 'lucide-react';
import Card from '@/components/Card/Card';
import axios from 'axios';

const DrugSearchPage = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);  // State for search results
    const [suggestions, setSuggestions] = useState([]);      // State for suggestions
    const [noResults, setNoResults] = useState(false);       // State for handling no results

    const changeInputHandler = (e) => {
        setInput(e.target.value);
    };

    const suggestionAPI = async(input) => {
        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${input}`);
            if (res.data.suggestionGroup.suggestionList) {
                console.log(res.data.suggestionGroup.suggestionList.suggestion)
                return res.data.suggestionGroup.suggestionList.suggestion;
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);
            alert('Error fetching suggestions.');
            return [];
        }
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        setNoResults(false);
        setSearchResults([]);
        setSuggestions([]);

        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${input}`);
            const conceptGroup = res.data.drugGroup.conceptGroup;

            if (conceptGroup && conceptGroup.length > 0) {
                setSearchResults(conceptGroup);  // Set the search results to the state
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
                    <Button type="submit">
                        <SearchIcon />
                    </Button>
                </form>

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
                                <li key={index}>{suggestion}</li>
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
