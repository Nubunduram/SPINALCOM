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

// Watch for changes in selectedBuilding and fetch room statuses accordingly
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
@import "../assets/mixin";

header {
    h1 {
        text-align: center;
        color: $default-blue;
        padding: $gap-m;
        font-size: $font-size-3xl;
    }
}

main {
    @include flex-setter (space-between);
    gap: $gap-sm;
    width: 100%;
    max-width: 1280px;
    margin: auto;
    border-radius: $border-radius-m;
    background-color: $light-blue;
    padding: $gap-xl;
    min-height: 50dvh;
    height: 600px;
    max-height: 70vh;
}

@media screen and (max-width: 767px) {
    header {
        h1 {
            font-size: $font-size-2xl;
        }
    }

    main {
        @include flex-setter (initial, initial, column);
        max-height: 80dvh;
        padding: $gap-sm;
    }
}
</style>