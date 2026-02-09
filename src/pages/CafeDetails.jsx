import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCafeById } from '../services/api';
import { ArrowLeft, Star, MapPin, Clock, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const  CafeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cafe, setCafe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCafe = async () => {
            setLoading(true);
            const data = await fetchCafeById(id);
            setCafe(data);
            setLoading(false);
        };
        loadCafe();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    if (!cafe) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
                <p className="mb-4">Cafe not found.</p>
                <button onClick={() => navigate('/')} className="text-amber-600 hover:underline">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 w-full">
                <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-6 left-6 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-xl shadow-xl overflow-hidden p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{cafe.name}</h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5" />
                                <span>{cafe.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${cafe.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {cafe.isOpen ? 'OPEN NOW' : 'CLOSED'}
                            </span>
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-gray-900">{cafe.rating}</span>
                                <span className="text-gray-500 text-sm">({cafe.reviews})</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                                <p className="text-gray-600 leading-relaxed theme-text-secondary">
                                    {cafe.description}
                                </p>
                            </div>

                            {/* Mock Amenities or items */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Popular Features</h2>
                                <div className="flex flex-wrap gap-2">
                                    {['Free Wi-Fi', 'Outdoor Seating', 'Vegan Options', 'Pet Friendly'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1 space-y-4">
                            <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Get Directions
                            </button>
                            <button className="w-full py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Share Location
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default CafeDetails;
