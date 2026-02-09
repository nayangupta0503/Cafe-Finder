import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CafeCard from '../components/CafeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Map from '../components/Map';
import { fetchCafes } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [cafes, setCafes] = useState([]);
    const [filteredCafes, setFilteredCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const fetchWithLocation = async (lat, lng) => {
                try {
                    const data = await fetchCafes(lat, lng);
                    setCafes(data);
                    setFilteredCafes(data);
                } catch (error) {
                    console.error("Failed to load cafes", error);
                    setCafes([]);
                    setFilteredCafes([]);
                } finally {
                    setLoading(false);
                }
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWithLocation(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        console.warn("Geolocation denied or failed, falling back to default", error);
                        fetchWithLocation(); // Default params in api.js
                    }
                );
            } else {
                fetchWithLocation();
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        let results = cafes;

        if (search) {
            const lowerSearch = search.toLowerCase();
            results = results.filter(cafe =>
                (cafe.name && cafe.name.toLowerCase().includes(lowerSearch)) ||
                (cafe.address && cafe.address.toLowerCase().includes(lowerSearch))
            );
        }

        if (minRating > 0) {
            results = results.filter(cafe => parseFloat(cafe.rating) >= minRating);
        }

        setFilteredCafes(results);
    }, [search, minRating, cafes]);

    const handleLocate = async (lat, lng) => {
        setLoading(true);
        try {
            const data = await fetchCafes(lat, lng);
            setCafes(data);
            setFilteredCafes(data);
        } catch (error) {
            console.error("Failed to load cafes for new location", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkerClick = (cafe) => {
        const element = document.getElementById(`cafe-${cafe.id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-2', 'ring-amber-500');
            setTimeout(() => element.classList.remove('ring-2', 'ring-amber-500'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onSearch={setSearch} onFilter={setMinRating} />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 h-full">

                    {/* Map Section - Top on mobile (order-1), Right on desktop (default/col-2) */}
                    <div className="order-1 lg:order-2 w-full h-80 lg:h-[calc(100vh-140px)] sticky top-0 z-10 lg:top-24 rounded-xl overflow-hidden shadow-md">
                        {!loading && <Map cafes={filteredCafes} onMarkerClick={handleMarkerClick} onLocate={handleLocate} />}
                        {loading && (
                            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">
                                Loading Map...
                            </div>
                        )}
                    </div>

                    {/* Cafe List Section - Bottom on mobile (order-2), Left on desktop */}
                    <div className="order-2 lg:order-1 space-y-6 overflow-y-auto lg:h-[calc(100vh-140px)] pr-2 custom-scrollbar">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {loading ? 'Finding coffee spots...' : `${filteredCafes.length} Cafes Found`}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {loading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <motion.div
                                            key={`skeleton-${i}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <SkeletonLoader />
                                        </motion.div>
                                    ))
                                ) : (
                                    filteredCafes.map(cafe => (
                                        <div id={`cafe-${cafe.id}`} key={cafe.id} className="transition-all duration-300 rounded-xl">
                                            <CafeCard cafe={cafe} />
                                        </div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                        {!loading && filteredCafes.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No cafes found matching your criteria. Try adjusting filters.
                            </div>
                        )}

                        {!loading && filteredCafes.length > 0 && (
                            <div className="text-center py-4 text-xs text-gray-400">
                                Data © OpenStreetMap contributors
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Home;
