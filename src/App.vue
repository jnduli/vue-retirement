<template>
  <div id="app">
    <RetirementBase/>
  </div>
</template>

<script>
import RetirementBase from './components/RetirementBase.vue';

export default {
  name: 'app',
  components: {
    RetirementBase,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
