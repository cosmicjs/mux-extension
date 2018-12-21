<template>
  <div>
    <div
      v-if="isCredentials"
      class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box has-text-centered">
          <p class="title is-5">Credentials Missing</p>
          <p class="subtitle">
            Please provide mux Credentials
          </p>
          <button
            class="button is-info"
            @click="toggleCredentialsModal">Add</button>
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
    toggleCredentialsModal() {
      this.$store.commit('SET_CREDENTIAL_MODAL', true);
    },
  }
}
</script>
