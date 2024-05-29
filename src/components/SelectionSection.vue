<template>
    <section class="pick-section">
        <select class="building-select" v-model="selectedBuilding">
            <option value="">--Sélection du bâtiment--</option>
            <option v-for="(building, index) in buildings" :key="index" :value="index">
                {{ building.name }}
            </option>
        </select>

        <div class="floors-container" v-if="selectedBuilding !== ''">
            <div class="floor" v-for="(floor, floorIndex) in buildings[selectedBuilding].children" :key="floorIndex">
                <button @click="selectFloor(floor, floorIndex)">
                    {{ floor.name }}
                </button>
                <p v-if="clickedFloorIndex === floorIndex">Étage occupé à :</p>
                <div v-if="clickedFloorIndex === floorIndex" class="occupancy-rate-bar">
                    <div class="occupancy-rate" :style="{ width: getOccupancyRate(floor) }"></div>
                    <span class="occupancy-rate-text">
                        {{ getOccupancyRate(floor) }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['buildings', 'roomStatuses']);
const emit = defineEmits(['floor-selected']);

const selectedBuilding = ref('');
const clickedFloorIndex = ref(null);

const selectFloor = (floor, floorIndex) => {
    emit('floor-selected', floor);
    clickedFloorIndex.value = floorIndex;
};

const getOccupancyRate = (floor) => {
    if (!floor.children.length) return "N/A";

    // Filter out rooms with undefined statuses
    const validRooms = floor.children.filter(room => props.roomStatuses[room.dynamicId] !== undefined);
    if (validRooms.length === 0) return "N/A"; // Return "N/A" if no valid rooms

    const occupiedRooms = validRooms.filter(room => props.roomStatuses[room.dynamicId]);

    // Calculate the occupancy rate considering only rooms with defined statuses
    const occupancyRate = ((occupiedRooms.length / validRooms.length) * 100).toFixed(0);

    return `${occupancyRate}%`;
};
</script>

<style lang="scss" scoped>
@import "../assets/variable";
@import "../assets/mixin";

.pick-section {
    @include container-width-setter($width-container);
    @include flex-setter (initial, initial, column);

    .building-select {
        width: 100%;
        text-align: center;
        border-radius: $border-radius-sm;
        padding: $gap-xs;
        font-size: $font-size-xl;
    }

    .floors-container {
        @include flex-setter (initial, initial, column);
        margin-top: $gap-m;
        gap: $gap-sm;
        height: 100%;
        overflow-y: auto;

        .floor {
            color: $default-white;

            button {
                width: 100%;
                background-color: $default-white;
                color: $default-blue;
                border: solid 2px $default-white;
                transition: 0.1s;
                border-radius: 5px;
                font-size: $font-size-2xl;
                padding: 8px;
            }

            p {
                padding-top: $gap-sm;
            }

            button:hover {
                background-color: $default-blue;
                color: $default-white;
            }

            .occupancy-rate-bar {
                position: relative;
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: $border-radius-sm;
                overflow: hidden;
                width: 100%;
                height: 24px;
                margin-top: $gap-sm;
            }

            .occupancy-rate {
                background-color: $default-orange;
                height: 100%;
                transition: 0.3s;
                width: 0;
            }

            .occupancy-rate-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-weight: 600;
            }
        }
    }
}

@media screen and (max-width: 767px) {
    .pick-section {
        @include container-sm-reponsive;

        select {
            font-size: $font-size-m;
        }

        .floors-container {
            margin-top: $gap-sm;
            gap: $gap-xs;

            .floor {
                button {
                    font-size: $font-size-m;
                    padding: $gap-xs;
                }
            }
        }
    }
}
</style>
