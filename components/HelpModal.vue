<template>
  <b-modal
    :active="isModal"
    :width="640"
    scroll="keep"
    @close="closeModal">
    <div class="box">
      <div class="content">
        <h3 class="title is-4">Connect to Mux</h3>
        <p>To add your Mux API Access Tokens in the Extension. Follow these steps:</p>
        <ol>
          <li><a
            href="https://mux.com"
            target="_blank">Login to your Mux account</a></li>
          <li>Go to Your Settings > API Access Tokens</li>
          <li>Click Generate new Token, set your environment & permissions</li>
          <li>Copy and paste your API Access Tokens (Application Token ID And Secret Key) into the Extension Query Parameters section located in Mux Extension > Settings.</li>
          <li>Enjoy uploading videos!</li>
        </ol>
        <input
          type="button"
          value="Add Access Tokens"
          class="button is-link"
          @click.stop="openCredentialModal">
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'HelpModal',
  computed: {
    isModal() {
      return this.$store.state.modal.help;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('SET_HELP_MODAL', false);
    },
    openCredentialModal() {
      this.$store.commit('SET_HELP_MODAL', false);
      this.$store.commit('SET_CREDENTIAL_MODAL', true);
    }
  }
};
</script>

