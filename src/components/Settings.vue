<template>
  <div class="layout-padding q-ma-md">
    <h3 class="text-center">App settings</h3>
    <form>
      <q-select @input="setUser" class="q-my-md" label="User" v-model="user" :options="userOptions" dropdown-icon="fa fa-angle-down" emit-value map-options>
        <template v-slot:before>
          <q-icon name="fas fw fa-user" />
        </template>
      </q-select>
      <q-select @input="setVoice" class="q-my-md" label="Voice" v-model="voice" :options="voiceOptions" dropdown-icon="fa fa-angle-down" emit-value map-options>
        <template v-slot:before>
          <q-icon name="fas fw fa-microphone" />
        </template>
      </q-select>
      <q-input @input="setApi" v-model="google_api" label="Google API">
        <template v-slot:before>
          <q-icon name="fas fw fa-key" />
        </template>
      </q-input>
    </form>
    <div class="text-center" v-if="google_api">
      <q-btn class="q-my-md" color="primary" @click.native="goHome()">All done! Back to home page</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userOptions: [],
      google_api: localStorage.getItem('SPELLING_Api'),
      user: localStorage.getItem('SPELLING_User'),
      voice: localStorage.getItem('SPELLING_Voice'),
      voiceOptions: [
        { label: 'Australian female 1', value: 'en-AU-Standard-A' },
        { label: 'Australian male 1', value: 'en-AU-Standard-B' },
        { label: 'Australian female 2', value: 'en-AU-Standard-C' },
        { label: 'Australian male 2', value: 'en-AU-Standard-D' },
        { label: 'UK female 1', value: 'en-GB-Standard-A' },
        { label: 'UK male 1', value: 'en-GB-Standard-B' },
        { label: 'UK female 2', value: 'en-GB-Standard-C' },
        { label: 'UK male 2', value: 'en-GB-Standard-D' },
        { label: 'US male 1', value: 'en-US-Standard-B' },
        { label: 'US female 1', value: 'en-US-Standard-C' },
        { label: 'US male 2', value: 'en-US-Standard-D' },
        { label: 'US female 2', value: 'en-US-Standard-E' }
      ]
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/users')
      .then(response => {
        for (var ukey in response.data) {
          this.userOptions.push({
            label: response.data[ukey].name,
            value: response.data[ukey].id
          })
        }
      })
      .catch(function (error) {
        this.$q.loading.hide()
        console.log(error)
      })
  },
  methods: {
    setUser () {
      localStorage.setItem('SPELLING_User', this.user)
    },
    setApi () {
      localStorage.setItem('SPELLING_Api', this.google_api)
    },
    setVoice () {
      localStorage.setItem('SPELLING_Voice', this.voice)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.layout-padding {
  padding-top:0;
}
p {
  margin-bottom: 0;
}
h3 {
  line-height:0px;
}
</style>
