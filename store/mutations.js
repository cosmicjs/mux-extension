const mutations = {
  SET_COSMIC_SETTINGS: (state, cosmic) => {
    state.settings = {
      ...state.settings,
      cosmic
    }
  },
  SET_MUX_SETTINGS: (state, mux) => {
    state.settings = {
      ...state.settings,
      mux
    }
  },
  SET_MUX_VIDEOS: (state, videos) => {
    state.videos = videos;
  },
  ADD_MUX_VIDEO: (state, video) => {
    state.videos.unshift(video);
  },
  SET_FORM: (state, payload) => {
    state.form = {
      ...state.form,
      ...payload
    }
  },
  SET_PROGRESS: (state, payload) => {
    state.progress = payload
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  SET_INIT: (state, payload) => {
    state.init = payload
  },
  SET_CREDENTIAL_MODAL: (state, payload) => {
    state.modal = {
      credential: payload,
      help: false
    }
  },
  SET_HELP_MODAL: (state, payload) => {
    state.modal = {
      credential: false,
      help: payload
    }
  }
}

export default mutations
