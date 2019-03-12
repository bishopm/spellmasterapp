<template>
  <div class="q-px-lg">
    <h5 class="text-center">Add new words</h5>
    <q-input @input="search" v-model="newword" label="Enter a new word (or search for a word to edit)"/>
    <q-input v-model="hint" label="Optional hint (for ambiguous words)"/>
    <q-select v-model="level" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9]" label="Level"></q-select>
    <q-select label="Categories" v-model="tags" use-input use-chips multiple input-debounce="0" @new-value="addCategory" :options="tagOptions"/>
    <div class="text-center q-ma-md">
      <q-btn :disabled="dontgo" color="primary" @click="submitword">Update database</q-btn>
    </div>
    <div v-if="similarwords">
      <p class="text-weight-bolder text-center">Similar existing words</p>
      <div v-for="word in similarwords" :key="word.id">
        <span v-if="word.word !== newword">{{word.word}}</span>
        <span v-else class="text-red">{{word.word}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newword: '',
      tags: [],
      dontgo: true,
      level: 1,
      hint: '',
      similarwords: [],
      tagOptions: ['countries', 'weekdays']
    }
  },
  methods: {
    search () {
      if (this.newword.length > 2) {
        this.dontgo = false
        this.$axios.get(process.env.API + '/words/' + this.newword)
          .then(response => {
            this.similarwords = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.dontgo = true
        this.similarwords = []
      }
    },
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
    }
  }
}
</script>

<style>
</style>
