<template>
  <div>
    <div
      v-if="isCredentials"
      class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box has-text-centered">
          <p class="title is-5">Credentials Missing</p>
          <p class="subtitle">
            Please provide Mux Credentials
          </p>
          <button
            class="button is-info"
            @click="toggleHelpModal">Help</button>
        </div>
      </div>
    </div>
    <div v-else>
      <upload-video />
      <videos-table v-if="!isLoading" />
    </div>
  </div>
</template>

<script>
import UploadVideo from '@/components/UploadVideo';
import VideosTable from '@/components/VideosTable'

export default {
  name: 'HomePage',
  components: {
    UploadVideo,
    VideosTable
  },
  computed: {
    isCredentials() {
      return !this.$store.state.loading && !this.$store.state.init;
    },
    isLoading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    toggleHelpModal() {
      this.$store.commit('SET_HELP_MODAL', true);
    },
  }
}
</script>
