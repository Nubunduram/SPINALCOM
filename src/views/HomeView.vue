<template>
    <header>
        <h1>Outil d'analyse d'occupation des bâtiments</h1>
    </header>
    <main>
        <SelectionSection :buildings="buildings" @floor-selected="handleFloorSelected" :roomStatuses="roomStatuses" />
        <FloorDetailSection :selectedFloor="selectedFloor" :roomStatuses="roomStatuses" />
    </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import SelectionSection from "@/components/SelectionSection.vue";
import FloorDetailSection from "@/components/FloorDetailSection.vue";
import { fetchBuildings, fetchRoomStatus } from '@/services/apiService';

const buildings = ref([]);
const selectedBuilding = ref('');
const selectedFloor = ref(null);
const roomStatuses = ref({});

const handleFloorSelected = async (floor) => {
    selectedFloor.value = floor;
    await fetchRoomStatuses(floor);
};

const fetchRoomStatuses = async (floor) => {
    if (floor) {
        const roomStatusPromises = floor.children.map(async room => {
            const status = await fetchRoomStatus(room.dynamicId);
            roomStatuses.value[room.dynamicId] = status;
        });
        await Promise.all(roomStatusPromises);
    }
};

watchEffect(() => {
    if (selectedBuilding.value !== '') {
        selectedFloor.value = null; // Reset selected floor when a building is changed
        const building = buildings.value[selectedBuilding.value];
        fetchRoomStatuses(building);
    }
});

// Fetch initial building data
fetchBuildings().then(data => {
    buildings.value = data;
});
</script>



<style lang="scss" scoped>
@import "../assets/variable";

header {
    h1 {
        text-align: center;
        color: var(--default-blue);
        padding: 16px;
        font-size: 2.5rem;
    }
}

main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 25px;
    background-color: var(--light-blue);
    padding: 32px;
    height: 600px;
    max-height: 80vh;
}
</style>