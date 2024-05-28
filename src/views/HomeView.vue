<template>
    <main>
        <select v-model="selectedBuilding">
            <option value="">--Sélection du bâtiment--</option>
            <option v-for="(building, index) in buildings" :key="index" :value="index">
                {{ building.name }}
            </option>
        </select>

        <details v-if="selectedBuilding !== ''">
            <summary>{{ buildings[selectedBuilding].name }}</summary>
            <ul>
                <li v-for="(floor, floorIndex) in buildings[selectedBuilding].children" :key="floorIndex">
                    <details>
                        <summary>{{ floor.name }}</summary>
                        <ul>
                            <li v-for="(room, roomIndex) in floor.children" :key="roomIndex">
                                <span>{{ room.name }}</span> -
                                <span v-if="roomStatuses[room.dynamicId] !== undefined">
                                    {{ roomStatuses[room.dynamicId] ? 'Occupé' : 'Non Occupé' }}
                                </span>
                                <span v-else>Indéfini</span>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </details>
    </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const buildings = ref([]);
const selectedBuilding = ref('');
const roomStatuses = ref({});

// Fonction pour récupérer les données des bâtiments
const fetchBuildings = async () => {
    try {
        const response = await fetch("https://api-developers.spinalcom.com/api/v1/geographicContext/space");
        const data = await response.json();
        buildings.value = data.children;
    } catch (error) {
        console.error("Erreur lors de la récupération des données des bâtiments :", error);
    }
};

// Fonction pour récupérer le statut des pièces
const fetchRoomStatus = async (dynamicId) => {
    try {
        const response = await fetch(`https://api-developers.spinalcom.com/api/v1/room/${dynamicId}/control_endpoint_list`);
        const data = await response.json();
        if (data && data[0] && data[0].endpoints) {
            const occupancyEndpoint = data[0].endpoints.find(endpoint => endpoint.name === 'Occupation');
            if (occupancyEndpoint) {
                roomStatuses.value[dynamicId] = occupancyEndpoint.currentValue;
            } else {
                roomStatuses.value[dynamicId] = undefined;
            }
        } else {
            roomStatuses.value[dynamicId] = undefined;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données des points de contrôle pour la pièce ${dynamicId} :`, error);
        roomStatuses.value[dynamicId] = undefined;
    }
};

// Surveillance des changements dans le bâtiment sélectionné pour charger les statuts des pièces
watchEffect(() => {
    if (selectedBuilding.value !== '') {
        const building = buildings.value[selectedBuilding.value];
        building.children.forEach(floor => {
            floor.children.forEach(room => {
                fetchRoomStatus(room.dynamicId);
            });
        });
    }
});

// Chargement initial des données des bâtiments
fetchBuildings();
</script>

<style lang="scss" scoped>
/* Ajoutez ici votre style */
</style>