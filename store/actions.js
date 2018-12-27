import cosmicjs from 'cosmicjs'
const Cosmic = cosmicjs();

const actions = {
  FETCH_MUX_SETTINGS: async ({ state, commit }) => {
    commit('SET_PROGRESS', true);
    const bucket = Cosmic.bucket(state.settings.cosmic);
    var urlParams = new URLSearchParams(window.location.search);
    var mux_access_token = decodeURI(urlParams.get('mux_access_token'));
    var mux_secret = decodeURI(urlParams.get('mux_secret'));
    const mux = {
      access_token_id: mux_access_token || '',
      secret_key: mux_secret || ''
    }
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
  },
  SAVE_MUX_SETTINGS: async ({ state, commit}) => {
    commit('SET_PROGRESS', true);
    const bucket = Cosmic.bucket(state.settings.cosmic);
    const cosmicObject = {
      type_slug: 'mux-info',
      slug: 'mux-info-credentials',
      title: 'MUX Credentials',
      content: '',
      metafields: [
        {
          key: 'access_token_id',
          type: 'text',
          value: state.form.access_token_id
        },
        {
          key: 'secret_key',
          type: 'text',
          value: state.form.secret_key
        }
      ],
    };
    try {
      await bucket.getObject({ slug: 'mux-info-credentials' });
      await bucket.editObject(cosmicObject);
    } catch(e) {
      if(e.message == "object not found") {
        await bucket.addObject(cosmicObject);
      }
    }
    const mux = {
      access_token_id: state.form.access_token_id,
      secret_key: state.form.secret_key
    }
    commit('SET_MUX_SETTINGS', mux);
    commit('SET_INIT', true);
    commit('SET_PROGRESS', false);
  }
}

export default actions
