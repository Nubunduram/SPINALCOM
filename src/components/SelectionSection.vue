<template>
    <section class="pick-section">
        <select v-model="selectedBuilding">
            <option value="">--Sélection du bâtiment--</option>
            <option v-for="(building, index) in buildings" :key="index" :value="index">
                {{ building.name }}
            </option>
        </select>

        <div class="floors-container" v-if="selectedBuilding !== ''">
            <div v-for="(floor, floorIndex) in buildings[selectedBuilding].children" :key="floorIndex">
                <button @click="selectFloor(floor)">
                    {{ floor.name }}
                </button>
                <p>Étage occupé à </p>
                <div class="occupancy-rate">
                    100%
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { ref } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps(['buildings']);
const emit = defineEmits(['floor-selected']);

const selectedBuilding = ref('');

const selectFloor = (floor) => {
    emit('floor-selected', floor);
};

const calculateOccupancyRate = (floor) => {
    const totalRooms = floor.children.length;
    const occupiedRooms = floor.children.filter(room => roomStatuses[room.dynamicId] === true).length;
    return totalRooms === 0 ? 0 : (occupiedRooms / totalRooms) * 100;
};

</script>

<style lang="scss" scoped>
@import "../assets/variable";

.pick-section {
    width: 400px;
    max-width: 35%;
    padding: 16px;
    border-radius: 15px;
    background-color: rgba(42, 53, 75, 0.7);

    select {
        width: 100%;
        text-align: center;
        padding: 4px;
        font-size: 1.2rem;
    }

    .floors-container {
        margin-top: 24px;
        display: grid;
        gap: 8px;

        div {
            display: flex;
            align-items: center;
            color: white;
            justify-content: space-between;

            button {
                width: 50%;
                background-color: var(--default-white);
                color: var(--default-blue);
                border: solid 2px var(--default-white);
                cursor: pointer;
                transition: 0.1s;
                border-radius: 5px;
                font-size: 1.5rem;
                padding: 8px;
            }

            button:hover {
                background-color: var(--default-blue);
                color: var(--default-white);
            }

            .occupancy-rate {
                height: 100%;
                aspect-ratio: 1/1;
                background-color: var(--default-orange);
                border-radius: 5px;
                color: var(--default-white);
                display: grid;
                place-content: center;
            }
        }
    }
}
</style>