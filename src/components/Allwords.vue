<template>
  <div class="q-px-lg">
    <h5 class="text-center">All words</h5>
    <q-item v-for="word in words" :key="word.id" :to="'/word/' + word.id" class="style:v-align='center'">
      {{word.word}} <q-badge class="q-ml-md" color="primary" v-for="tag in word.tags" :key="tag.id">{{tag.name}}</q-badge>
    </q-item>
    <q-pagination v-model="current" :max="10" :directionLinks="true"></q-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      words: [],
      current: 1
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/words')
      .then(response => {
        this.words = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
