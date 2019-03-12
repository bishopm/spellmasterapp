<template>
  <div class="q-mx-md text-center">
    <div class="text-center q-ma-md" v-if="username">Welcome, {{username}}! Your score is {{score}}% [{{correct}}/{{attempts}}]</div>
    <q-select class="q-my-md" label="Category (optional)" outlined v-model="tag" :options="tagOptions">
      <template v-slot:append>
        <q-icon v-if="tag !== null" class="cursor-pointer" name="fa fa-times" @click.stop="tag = null"/>
      </template>
    </q-select>
    <q-btn icon="fa fa-sync-alt" @click="playSound">&nbsp;Replay</q-btn>
    <p v-if="word.hint"><b>Hint:</b> {{word.hint}}</p>
    <q-input class="q-my-md" outlined v-model="guess" label="type in the word"></q-input>
    <q-btn v-if="!show" class="q-ma-md" @click="showAnswer">Check my answer</q-btn>
    <div v-if="show">
      <h4>{{word.word}}
        <q-icon v-if="answer" name="fa fa-check text-green"></q-icon>
        <q-icon v-else name="fa fa-times text-red"></q-icon>
      </h4>
      <div v-if="answer" class="text-center">
        <q-img src="statics/right.gif" style="height: 250px; max-width: 250px"/>
      </div>
      <div v-else class="text-center">
        <q-img src="statics/facepalm.webp" style="height: 250px; max-width: 250px"/>
      </div>
      <q-btn class="q-ma-md" @click="getWord">Next word</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      word: {},
      username: '',
      score: '',
      attempts: '',
      correct: '',
      api: localStorage.getItem('SPELLING_Api'),
      voice: localStorage.getItem('SPELLING_Voice'),
      tagOptions: [],
      tag: '',
      src: '',
      guess: '',
      show: false,
      answer: false
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/welcome/' + localStorage.getItem('SPELLING_User'))
      .then(response => {
        for (var tndx in response.data.tags) {
          this.tagOptions.push(response.data.tags[tndx].name)
        }
        this.username = response.data.user.name
        this.score = Math.round(response.data.score)
        this.attempts = response.data.attempts
        this.correct = response.data.correct
        this.getWord()
      })
      .catch(function (error) {
        this.$q.loading.hide()
        console.log(error)
      })
  },
  methods: {
    playSound () {
      this.snd.play()
    },
    showAnswer () {
      this.show = true
      var correct = 1
      if (this.guess === this.word.word) {
        this.answer = true
        this.fb = new Audio('statics/cheer.mp3')
        this.fb.play()
      } else {
        this.answer = false
        this.fb = new Audio('statics/fart.mp3')
        this.fb.play()
        correct = 0
      }
      this.$q.loading.show({ message: 'Loading your next word' })
      this.$axios.post(process.env.API + '/answer',
        {
          user_id: localStorage.getItem('SPELLING_User'),
          word_id: this.word.id,
          answer: correct
        })
        .then(response => {
          this.score = Math.round(response.data.score)
          this.attempts = response.data.attempts
          this.correct = response.data.correct
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
          this.$q.loading.hide()
        })
    },
    getWord () {
      this.show = false
      this.guess = ''
      this.word = {}
      this.$axios.get(process.env.API + '/word')
        .then(response => {
          this.word = response.data[0]
          this.$axios.post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + this.api,
            {
              audioConfig: {
                'audioEncoding': 'LINEAR16',
                'pitch': '0.00',
                'speakingRate': '1.00'
              },
              input: {
                'text': this.word.word
              },
              voice: {
                'languageCode': this.voice.substring(0, 5),
                'name': this.voice
              }
            })
            .then(response => {
              this.snd = new Audio('data:audio/x-wav;base64, ' + response.data.audioContent)
              this.snd.play()
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          this.$q.loading.hide()
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-item {
  min-height: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
