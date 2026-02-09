import React, { useState } from 'react';
import { Search, Coffee, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [minRating, setMinRating] = useState(0);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    const handleRatingChange = (e) => {
        const rating = Number(e.target.value);
        setMinRating(rating);
        onFilter(rating);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-sm sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Coffee className="h-8 w-8 text-amber-600" />
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cafe Finder</h1>
                    </div>

                    <div className="flex flex-1 max-w-2xl gap-4 flex-col sm:flex-row">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Search by name or location..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select
                                    value={minRating}
                                    onChange={handleRatingChange}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                                >
                                    <option value="0">All Ratings</option>
                                    <option value="3">3+ Stars</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="4.5">4.5+ Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
