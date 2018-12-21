import axios from 'axios';

export default class Mux {
  constructor(state) {
    this.state = state;
    this.baseUrl = 'https://api.mux.com';
    this.proxyUrl = 'https://1v2tdc90i0.execute-api.us-east-1.amazonaws.com/dev/upload-video';
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
