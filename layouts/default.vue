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
                src="https://imgix.cosmicjs.com/4adbc350-27ab-11ec-bc05-c54d649deec6-cosmic-logo.svg"
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
              <img src="https://imgix.cosmicjs.com/4d2f0220-27ab-11ec-bc05-c54d649deec6-mux-logo.png?w=100">
            </a>
            <a
              class="navbar-item"
              @click="toggleHelpModal">
              <b-icon
                type="is-info"
                size="is-medium"
                icon="help-circle" />
            </a>
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
        <help-modal />
      </div>
    </section>
  </div>
</template>

<script>
import HelpModal from '@/components/HelpModal'

export default {
  components: {
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
    const mux = {
      access_token_id: this.$route.query.mux_access_token || '',
      secret_key: this.$route.query.mux_secret || '',
    }
    if(mux.access_token_id && mux.secret_key) {
      await this.$store.dispatch('SET_MUX_SETTINGS', mux);
      await this.$store.dispatch('FETCH_MUX_VIDEOS');
    } else {
      this.$store.commit('SET_HELP_MODAL', true);
    }
    this.$store.commit('SET_LOADING', false);
  },
  methods: {
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

