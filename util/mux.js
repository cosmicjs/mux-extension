import axios from 'axios';

export default class Mux {
  constructor(state) {
    this.state = state;
    this.baseUrl = 'https://api.mux.com';
    this.proxyUrl = 'http://localhost:3000/';
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
    });
  }
  createVideo(url) {
    return this.http.post(this.proxyUrl, {
      input: url,
      playback_policy: ['public'],
      proxy: {
        url: `${this.baseUrl}/video/v1/assets`,
        username: this.state.settings.mux.access_token_id,
        password: this.state.settings.mux.secret_key
      }
    })
  }
}
