<script setup>
import { ref } from 'vue';

// Référence pour le bâtiment sélectionné
const selectedBuilding = ref("");
// Données des bâtiments et des points de contrôle des pièces
const buildings = ref([]);
const roomControlEndpoints = ref([]);

// Fonction pour obtenir les étages pour le bâtiment sélectionné
const getFloors = (buildingName) => {
  const building = buildings.value.find(b => b.name === buildingName);
  return building ? building.children : [];
};
let occuped;
// Appel d'API pour récupérer les données des bâtiments
fetch("https://api-developers.spinalcom.com/api/v1/geographicContext/space")
  .then(response => response.json())
  .then(data => {

    buildings.value = data.children;
    // Extracting dynamic ID from the response
    const dynamicId = data.children[0].children[0].children[2].dynamicId;

    // Use the dynamic ID to fetch room control endpoints
    fetch(`https://api-developers.spinalcom.com/api/v1/room/${dynamicId}/control_endpoint_list`)
      .then(response => response.json())
      .then(data => {
        roomControlEndpoints.value = data;
        occuped = roomControlEndpoints.value[0].endpoints[4].currentValue;
        // (If occuped return true then affiché Occupé, if it returns false, Non Occupé, if undefined/null return Undefined)
        console.log(roomControlEndpoints.value[0].endpoints[4].currentValue)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données des points de contrôle des pièces :", error);
      });
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données des bâtiments :", error);
  });

</script>
<template>
  <main>
    <select v-model="selectedBuilding">
      <option value="">--Sélection du bâtiment--</option>
      <option v-for="building in buildings" :key="building.staticId" :value="building.name">{{ building.name }}</option>
    </select>

    <details v-if="selectedBuilding">
      <summary>{{ selectedBuilding }}</summary>
      <ul>
        <li v-for="floor in getFloors(selectedBuilding)" :key="floor.staticId">
          <details>
            <summary>{{ floor.name }}</summary>
            <ul>
              <li v-for="room in floor.children" :key="room.staticId">
                <span>{{ room.name }}</span>
                <span>{{ occuped }}</span>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </main>
</template>

<style lang="scss" scoped></style>
