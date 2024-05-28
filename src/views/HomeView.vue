<template>
    <main>
        <SelectionSection :buildings="buildings" @floor-selected="handleFloorSelected" />
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
        floor.children.forEach(async room => {
            const status = await fetchRoomStatus(room.dynamicId);
            roomStatuses.value[room.dynamicId] = status;
        });
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
main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 32px;
    border-radius: 25px;
    background-color: rgb(205, 213, 243);
    padding: 32px;
    height: 600px;
    max-height: 80vh;
}
</style>