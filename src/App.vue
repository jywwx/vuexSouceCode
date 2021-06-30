<template>
  <div id="app">
    <div>{{this.$store.state.num}}</div>
    <div>{{this.$store.getters.getNum}}</div> 
    <button @click="add"> 增加</button>
    <button @click="decre"> 减少</button>
    <button @click="asyncadd"> 异步增加</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  methods: {
    add() {
      this.$store.commit('incre',10)
    },
    decre() {
      this.$store.commit('decre',10)
    },
    asyncadd() {
      this.$store.dispatch('asyncincre',20)
    }
  },
  mounted () {
    console.log(this.$store,"this.$store")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
