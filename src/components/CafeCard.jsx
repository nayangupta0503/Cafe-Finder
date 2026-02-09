import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CafeCard = ({ cafe }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => navigate(`/cafe/${cafe.id}`)}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">{cafe.rating}</span>
                </div>
                {!cafe.isOpen && (
                    <div className="absolute top-2 left-2 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        CLOSED
                    </div>
                )}
                {cafe.isOpen && (
                    <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        OPEN
                    </div>
                )}
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{cafe.name}</h3>

                <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{cafe.address}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500">
                        {cafe.reviews} reviews
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                        View Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default CafeCard;
