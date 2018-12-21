<template>
  <b-modal
    :active="isModal"
    :width="500"
    @close="closeModal">
    <b-loading
      :is-full-page="false"
      :active="isSaving" />
    <div class="box">
      <form @submit.prevent="saveMuxCredentials">
        <h3 class="title is-4">Mux Credentials</h3>
        <b-field label="Access Token ID">
          <b-input
            v-model="access_token_id"
            required
            placeholder="Mux Access Token ID"/>
        </b-field>
        <b-field label="Secret Key">
          <b-input
            v-model="secret_key"
            required
            placeholder="Mux Secret Key" />
        </b-field>
        <br>
        <input
          :disabled="isSaving"
          type="submit"
          value="Save"
          class="button is-link">
      </form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'CredentialModal',
  computed: {
    access_token_id: {
      get () {
        return this.$store.state.form.access_token_id
      },
      set (value) {
        this.$store.commit('SET_FORM', {
          access_token_id: value
        })
      }
    },
    secret_key: {
      get () {
        return this.$store.state.form.secret_key
      },
      set (value) {
        this.$store.commit('SET_FORM', {
          secret_key: value
        })
      }
    },
    isModal() {
      return this.$store.state.modal.credential;
    },
    isSaving() {
      return this.$store.state.modal.credential && this.$store.state.progress;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('SET_CREDENTIAL_MODAL', false);
    },
    saveMuxCredentials() {
      this.$store.dispatch('SAVE_MUX_SETTINGS');
    }
  }
};
</script>

