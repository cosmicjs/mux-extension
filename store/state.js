const state = {
  init: false,
  loading: true,
  progress: false,
  success: {},
  error: {},
  videos: [],
  settings: {
    cosmic: {
      slug: '',
      read_key: '',
      write_key: ''
    },
    mux: {
      access_token_id: '',
      secret_key: ''
    }
  },
  modal: {
    help: false
  },
  form: {
    access_token_id: '',
    secret_key: ''
  }
}

export default state
