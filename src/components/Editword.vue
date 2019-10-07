<template>
  <div class="q-px-lg">
    <h5 class="text-center">Edit word</h5>
    <q-input v-model="word" label="Word"/>
    <q-input v-model="hint" label="Optional hint (for ambiguous words)"/>
    <q-select v-model="level" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9]" label="Level"></q-select>
    <q-select label="Categories" v-model="tags" use-input use-chips multiple input-debounce="0" @new-value="addCategory" :options="tagOptions"/>
    <div class="text-center q-ma-md">
      <q-btn :disabled="dontgo" color="primary" @click="submitword">Update database</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      word: '',
      tags: [],
      dontgo: false,
      level: 1,
      hint: '',
      similarwords: [],
      tagOptions: ['countries', 'weekdays']
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/word/' + this.$route.params.id)
      .then(response => {
        for (var wndx in response.data.tags) {
          this.tags.push(response.data.tags[wndx].name)
        }
        this.word = response.data.word
        this.hint = response.data.hint
        this.level = response.data.level
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    submitword () {
      this.$axios.post(process.env.API + '/word',
        {
          word: this.newword,
          hint: this.hint,
          level: this.level,
          tags: this.tags
        })
        .then(response => {
          this.newword = ''
          this.hint = ''
          this.dontgo = true
          this.similarwords = []
          this.tags = []
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addCategory (val) {
      this.tagOptions.push(val)
      this.tags.push(val)
      this.dontgo = false
    }
  }
}
</script>

<style>
</style>
