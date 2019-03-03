<template lang="pug">
  b-container
    div#index
      b-jumbotron(
        header="CM Management",
        lead="Blibli Future Program Project Fase 2",
        fluid)
        hr
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.jumbotron {
  padding-left: 8%;
  padding-right: 8%;
  min-height: 510px;
  min-height: -webkit-fill-available;
}
</style>
