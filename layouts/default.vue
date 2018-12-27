<template>
  <div>
    <nav class="navbar is-spaced">
      <div class="container">
        <div class="navbar-brand">
          <h1 class="title is-2">Mux Extension</h1>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <a
              target="_blank"
              href="https://cosmicjs.com"
              class="navbar-item">
              <img
                src="~assets/cosmic-logo.svg"
                width="24">
            </a>
            <div class="navbar-item">
              <b-icon
                type="is-danger"
                icon="heart"/>
            </div>
            <a
              target="_blank"
              href="https://mux.com"
              class="navbar-item">
              <img src="~assets/mux-logo.png">
            </a>
            <b-dropdown position="is-bottom-left">
              <a
                slot="trigger"
                class="navbar-item">
                <b-icon
                  size="is-medium"
                  icon="settings" />
              </a>
              <b-dropdown-item
                value="mux-credentials"
                @click="toggleCredentialsModal">
                <b-icon
                  size="is-small"
                  icon="wrench"/>
                Mux Credentials
              </b-dropdown-item>
              <b-dropdown-item
                value="help"
                @click="toggleHelpModal">
                <b-icon
                  size="is-small"
                  icon="help" />
                Help
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>
    <section
      class="section"
      style="padding: 0 20px;">
      <div class="container">
        <b-loading :active="isLoading" />
        <nuxt />
        <credential-modal />
        <help-modal />
      </div>
    </section>
  </div>
</template>

<script>
import CredentialModal from '@/components/CredentialModal'
import HelpModal from '@/components/HelpModal'

export default {
  components: {
    CredentialModal,
    HelpModal
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    }
  },
  async beforeCreate() {
    const cosmic = {
      slug: this.$route.query.bucket_slug || 'mux-test',
      read_key: this.$route.query.read_key || '',
      write_key: this.$route.query.write_key || '',
    }
    this.$store.commit('SET_COSMIC_SETTINGS', cosmic);
    await this.$store.dispatch('FETCH_MUX_SETTINGS');
    await this.$store.dispatch('FETCH_MUX_VIDEOS');
    this.$store.commit('SET_LOADING', false);
  },
  methods: {
    toggleCredentialsModal() {
      this.$store.commit('SET_CREDENTIAL_MODAL', true);
    },
    toggleHelpModal() {
      this.$store.commit('SET_HELP_MODAL', true);
    }
  },
};
</script>

<style scoped>
.navbar.is-spaced {
  padding: 1rem 1.5rem;
}
.navbar-item {
  display: flex;
  align-items: center;
}
.navbar .container {
  display: flex;
}
.navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
  align-items: stretch;
  display: flex;
  padding: 0;
}

.navbar-menu{
  flex-grow: 1;
  flex-shrink: 0;
  box-shadow: unset;
}
.navbar-start{
  justify-content: flex-start;
  margin-right: auto;
}
.navbar-end{
  justify-content: flex-end;
  margin-left: auto;
}
a.dropdown-item.is-active {
  color: #4a4a4a;
  background-color: white;
}
a.dropdown-item.is-active:hover {
  background-color: whitesmoke;
}
</style>

