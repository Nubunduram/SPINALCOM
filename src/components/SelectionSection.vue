<template>
    <section class="pick-section">
        <select v-model="selectedBuilding">
            <option value="">--Sélection du bâtiment--</option>
            <option v-for="(building, index) in buildings" :key="index" :value="index">
                {{ building.name }}
            </option>
        </select>

        <div v-if="selectedBuilding !== ''">
            <div v-for="(floor, floorIndex) in buildings[selectedBuilding].children" :key="floorIndex">
                <button @click="selectFloor(floor)">
                    {{ floor.name }}
                </button>
                <div class="occupancy-rate">
                    Occupancy Rate: %
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
.pick-section {
    min-width: 300px;

    select {
        width: 100%;
        text-align: center;
        padding: 4px;
    }

    div {
        div {
            display: flex;
            justify-content: space-between;

            button {
                width: 50%;
            }
        }
    }
}
</style>