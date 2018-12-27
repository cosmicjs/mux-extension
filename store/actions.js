import cosmicjs from 'cosmicjs'
const Cosmic = cosmicjs();

const actions = {
  SET_MUX_SETTINGS: async ({ state, commit }, mux) => {
    commit('SET_PROGRESS', true);
    commit('SET_MUX_SETTINGS', mux);
    commit('SET_FORM', mux);
    commit('SET_INIT', true);
    commit('SET_PROGRESS', false);
  },
  FETCH_MUX_VIDEOS: async ({ state, commit}) => {
    const bucket = Cosmic.bucket(state.settings.cosmic);
    const params = {
      type: 'mux-videos',
      sort: '-created_at'
    };
    try {
      const { objects: videos } = await bucket.getObjects(params);
      if (videos && videos.length > 0) {
        commit('SET_MUX_VIDEOS', videos);
      }
    } catch(e) {

    }
  }
}

export default actions
