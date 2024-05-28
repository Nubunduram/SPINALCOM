export const fetchBuildings = async () => {
    try {
        const response = await fetch("https://api-developers.spinalcom.com/api/v1/geographicContext/space");
        const data = await response.json();
        return data.children;
    } catch (error) {
        console.error("Erreur lors de la récupération des données des bâtiments :", error);
        return [];
    }
};

export const fetchRoomStatus = async (dynamicId) => {
    try {
        const response = await fetch(`https://api-developers.spinalcom.com/api/v1/room/${dynamicId}/control_endpoint_list`);
        const data = await response.json();
        // console.log(data[0].endpoints[4].currentValue);
        if (data && data[0] && data[0].endpoints) {
            const occupancyEndpoint = data[0].endpoints.find(endpoint => endpoint.name === 'Occupation');
            // console.log("Occupancy Endpoint:", occupancyEndpoint.currentValue);
            return occupancyEndpoint ? occupancyEndpoint.currentValue : undefined;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données des points de contrôle pour la pièce ${dynamicId} :`, error);
        return "Error";
    }
};
