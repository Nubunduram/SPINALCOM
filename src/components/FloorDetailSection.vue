<template>
  <aside>
    <div class="aside-grid" v-if="selectedFloor">
      <div v-for="room in selectedFloor.children" :key="room.dynamicId">
        <span class="room-name">{{ room.name }}</span>
        <span class="occupancy-status" :class="getOccupancyClass(roomStatuses[room.dynamicId])">
          {{ getOccupancyText(roomStatuses[room.dynamicId]) }}
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['selectedFloor', 'roomStatuses']);

// Function to change color of status by attributing class based on the status
const getOccupancyClass = (status) => {
  switch (status) {
    case true:
      return 'occupied';
    case false:
      return 'not-occupied';
    default:
      return 'undefined';
  }
};

// Function to get occupancy text based on status
const getOccupancyText = (status) => {
  switch (status) {
    case true:
      return 'Occupé';
    case false:
      return 'Non Occupé';
    default:
      return 'Undefined';
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/variable";
@import "../assets/mixin";

aside {
  @include container-width-setter($width-container);
  height: 100%;
  font-weight: 500;
  font-size: $font-size-l;
  flex: 1;

  .aside-grid {
    display: grid;
    gap: $gap-xs;
    max-height: 100%;
    overflow-y: auto;

    div {
      @include flex-setter (space-between);
      background-color: $default-white;
      border-radius: $border-radius-sm;
      padding: $gap-sm $gap-m;
      margin: auto $gap-sm;

      .occupancy-status {
        text-align: end;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  aside {
    @include container-sm-reponsive;
    padding: $gap-sm;

    .aside-grid {
      div {
        margin: 0;
      }
    }
  }
}
</style>
