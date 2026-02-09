
// Default location: Central Park, New York
const DEFAULT_LAT = 40.7812;
const DEFAULT_LON = -73.9665;
const RADIUS = 2000; // 2km radius

export const fetchCafes = async (lat = DEFAULT_LAT, lon = DEFAULT_LON) => {
    try {
        // Overpass API query to find cafes within radius
        const query = `
      [out:json];
      (
        node["amenity"="cafe"](around:${RADIUS},${lat},${lon});
        way["amenity"="cafe"](around:${RADIUS},${lat},${lon});
      );
      out center;
    `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Overpass API');
        }

        const data = await response.json();

        // Transform OSM data to our app's format
        return data.elements.map(element => {
            // For 'way' elements, center is provided by 'out center'
            const latitude = element.lat || element.center.lat;
            const longitude = element.lon || element.center.lon;

            return {
                id: element.id,
                name: element.tags.name || "Unnamed Cafe",
                rating: (Math.random() * (5 - 3) + 3).toFixed(1), // Mock rating as OSM doesn't have it generally
                reviews: Math.floor(Math.random() * 200) + 10, // Mock reviews
                address: element.tags['addr:street'] ? `${element.tags['addr:housenumber'] || ''} ${element.tags['addr:street']}` : "Address not available",
                // Rotate through some mock images since OSM doesn't provide images
                image: getMockImage(element.id),
                isOpen: !element.tags.opening_hours ? true : checkOpeningHours(element.tags.opening_hours), // Simplified check
                description: element.tags.description || "A lovely spot for coffee.",
                coordinates: { lat: latitude, lng: longitude }
            };
        }).filter(cafe => cafe.name !== "Unnamed Cafe"); // Filter out unnamed data points for cleaner UI

    } catch (error) {
        console.error("Error fetching cafes:", error);
        return []; // Return empty array on error to safely handle in UI
    }
};

export const fetchCafeById = async (id) => {
    // In a real app with backend, we'd fetch specific ID. 
    // For this demo with Overpass, we can just re-fetch nearby or store in context.
    // To keep it simple and stateless for this demo, we'll re-fetch a small area around the known location 
    // OR just return a mock if it's a direct link. 
    // BETTER APPROACH for this constrained environment: 
    // Since we don't have a persistent store, we might just have to fetch the list again and find it, 
    // or fetch the specific node from OSM.

    try {
        const query = `
            [out:json];
            (
                node(${id});
                way(${id});
            );
            out center;
        `;
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
        });
        const data = await response.json();
        const element = data.elements[0];

        if (!element) return null;

        const latitude = element.lat || element.center.lat;
        const longitude = element.lon || element.center.lon;

        return {
            id: element.id,
            name: element.tags.name || "Unnamed Cafe",
            rating: 4.5, // Mock
            reviews: 100, // Mock
            address: element.tags['addr:street'] || "Address unavailable",
            image: getMockImage(element.id),
            isOpen: true,
            description: element.tags.description || "Details fetched from OpenStreetMap.",
            coordinates: { lat: latitude, lng: longitude }
        };
    } catch (e) {
        console.error("Error fetching cafe details:", e);
        return null;
    }
};

// Helper for deterministic mock images based on ID
function getMockImage(id) {
    const images = [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
    ];
    return images[id % images.length];
}

function checkOpeningHours(osmOpeningHours) {
    // Very basic check, parsing OSM opening_hours is complex.
    // Assuming open if string exists for now, or random.
    return true;
}
