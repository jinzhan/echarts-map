<template>
  <div class="hello">
    <div id="guard-map"></div>
  </div>
</template>

<script>
import initMap from './src/map';
import data from './src/demoData.json';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted: function() {
    this.$nextTick(function() {
      initMap('guard-map', {
        guardData :data
        });
    });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  background: #931b00;
}

#guard-map {
  width: 100%;
  height: 300px;
}
</style>
