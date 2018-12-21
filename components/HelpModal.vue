<template>
  <b-modal
    :active="isModal"
    :width="640"
    scroll="keep"
    @close="closeModal">
    <div class="box">
      <div class="content"/>
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
    }
  }
};
</script>

