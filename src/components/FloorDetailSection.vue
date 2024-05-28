<template>
  <aside v-if="selectedFloor">
    <div v-for="room in selectedFloor.children" :key="room.dynamicId">
      <span class="room-name">{{ room.name }}</span>
      <span :class="getOccupancyClass(roomStatuses[room.dynamicId])" class="room-occupancy-status">
        {{ getOccupancyText(roomStatuses[room.dynamicId]) }}
      </span>
    </div>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['selectedFloor', 'roomStatuses']);

const getOccupancyClass = (status) => {
  if (status === true) {
    return 'occupied';
  } else if (status === false) {
    return 'not-occupied';
  } else {
    return 'undefined';
  }
};

const getOccupancyText = (status) => {
  if (status === true) {
    return 'Occupé';
  } else if (status === false) {
    return 'Non Occupé';
  } else {
    return 'Undefined';
  }
};
</script>

<style lang="scss" scoped>
aside {
  font-weight: 500;
  border-radius: 15px;
  padding: 16px;
  width: 400px;
  max-width: 35%;
  display: grid;
  height: fit-content;
  max-height: 100%;
  gap: 8px;
  overflow-y: auto;


  div {
    height: fit-content;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 8px 16px;

    .room-occupancy-status {
      text-align: end;
    }
  }
}

.occupied {
  color: green;
}

.not-occupied {
  color: red;
}

.undefined {
  color: rgb(52, 47, 47);
}
</style>
