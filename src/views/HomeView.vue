<script setup>
</script>

<template>
  <main>
    <select>
      <option value="">--Séléction du bâtiment--</option>
      <option>Usine</option>
    </select>
    <div>[Nom Etage 1] + [%Occupation]</div>
    <div>[Nom Etage 2] + [%Occupation]</div>
    <div>[Nom Etage 3] + [%Occupation]</div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  place-content: center;
  max-width: 1280px;
  margin: auto;
}
</style>