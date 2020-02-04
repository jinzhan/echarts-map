<template>
  <div class="hello">
    <div id="guard-map"></div>
  </div>
</template>

<script>
import initMap from './map';
import data from './data.json';
export default {
  name: 'HelloWuhan',
  props: {
    msg: String
  },
  mounted: function() {
    this.$nextTick(function() {
      const map = initMap('guard-map', {
        backgroundColor: '#931b00',
        guardList: data.data.province,
        guardNum: data.data.num
        });

      setTimeout(() => {
        map.update({
          guardList: data.data.province,
          guardNum: data.data.num * 10
        });
      }, 20000);
    });
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  background: #931b00;
}

#guard-map {
  width: 100%;
  height: 500px;
}
</style>
