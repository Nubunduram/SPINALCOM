<template>
  <aside>
    <div class="aside-grid" v-if="selectedFloor">
      <div v-for="room in selectedFloor.children" :key="room.dynamicId">
        <span class="room-name">{{ room.name }}</span>
        <span :class="getOccupancyClass(roomStatuses[room.dynamicId])" class="room-occupancy-status">
          {{ getOccupancyText(roomStatuses[room.dynamicId]) }}
        </span>
      </div>
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
@import "../assets/variable";

aside {
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 15px;
  padding: 16px;
  width: 400px;
  max-width: 35%;
  height: 100%;
  background-color: rgba(42, 53, 75, 0.7);

  .aside-title {
    color: var(--default-white);
    text-align: center
  }

  .aside-grid {
    display: grid;
    gap: 8px;
    height: fit-content;
    max-height: 100%;
    overflow-y: auto;

    div {
      height: fit-content;
      display: flex;
      justify-content: space-between;
      background-color: var(--default-white);
      border-radius: 15px;
      padding: 8px 16px;

      .room-occupancy-status {
        text-align: end;
      }
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
