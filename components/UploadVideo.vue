<template>
  <div>
    <div
      v-if="isNotify"
      class="columns">
      <div class="column is-half is-offset-one-quarter">
        <b-notification
          :active.sync="isNotify"
          :type="notify.type">
          {{ notify.message }}
        </b-notification>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <div class="is-pulled-left">
          <h3 class="title is-3">Videos</h3>
        </div>
        <div class="is-pulled-right">
          <b-tooltip
            :active="!isWriteKey"
            label="Setup 'Write Key' in Settings > API Access"
            position="is-left">
            <button
              v-if="!videosEmpty || !isWriteKey"
              :disabled="!isWriteKey"
              class="button is-info"
              @click="isUploadOpen = !isUploadOpen">{{ uploadButtonText }}</button>
          </b-tooltip>
        </div>
      </div>
    </div>
    <b-collapse :open="!isLoading && isWriteKey && (isUploadOpen || videosEmpty)">
      <b-loading
        :is-full-page="false"
        :active="uploading" />
      <div v-if="uploadFile && uploadFile.length > 0">
        <p class="sub-title">{{ uploadFile[0].name }}</p>
      </div>
      <b-field>
        <b-upload
          v-model="uploadFile"
          :disabled="uploading"
          drag-drop
          accept="video/mp4,video/x-m4v,video/*"
          @input="uploadFileChange">
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon
                  icon="upload"
                  size="is-large" />
              </p>
              <p>Drop your file here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </b-collapse>
  </div>
</template>

<script>
import Cosmic from 'cosmicjs';
import Mux from '@/util/mux'

const api = Cosmic({
  version: 'v3',
});
export default {
  data() {
    return {
      isNotify: false,
      isSuccess: false,
      isUploadOpen: false,
      uploadFile: null,
      uploading: false
    }
  },
  computed: {
    uploadButtonText() {
      return this.isUploadOpen ? 'Cancel' : 'Upload Video';
    },
    notify() {
      return this.isNotify && this.isSuccess ? {
          type: 'is-success',
          message: 'Video uploaded successfully. Mux will take few momements to process the video.'
        } : {
          type: 'is-danger',
          message: 'Error in uploading Video.'
        };
    },
    isLoading() {
      return this.$store.state.loading;
    },
    videosEmpty() {
      return this.$store.state.videos.length === 0;
    },
    isWriteKey() {
      return !!this.$store.state.settings.cosmic.write_key;
    },
  },
  methods: {
    async uploadFileChange() {
      this.uploading = true;
      const mux = new Mux(this.$store.state);
      const bucket = api.bucket(this.$store.state.settings.cosmic);
      try{
        const { media } = await bucket.addMedia({ media: this.uploadFile[0] });
        const { data: response } = await mux.createVideo(media.url);
        const data = response.data;
        const { object: video } = await bucket.addObject({
          type: 'mux-videos',
          title: media.original_name,
          content: '',
          options: {
            content_editor: false
          },
          metafields: [
            {
              title: "MUX ID",
              key: 'mux_id',
              type: 'text',
              value: data.id
            },
            {
              title: "MUX Playback ID",
              key: 'mux_playback_id',
              type: 'text',
              value: data.playback_ids[0].id
            },
            {
              title: "MUX Playback URL",
              key: 'mux_playback_url',
              type: 'text',
              value: `https://stream.mux.com/${data.playback_ids[0].id}.m3u8`
            }
          ],
        });
        this.$store.commit('ADD_MUX_VIDEO', video);
        this.isSuccess = true;
      } catch(e) {
        this.isSuccess = false;
      }
      this.isNotify = true;
      this.uploadFile = null;
      this.isUploadOpen = false;
      this.uploading = false;
    }
  }
};
</script>
<style scoped>
.button {
  margin-bottom: 0;
}
.upload >>> .upload-draggable {
  display: block;
}
</style>

