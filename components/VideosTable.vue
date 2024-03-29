<template>
  <div class="video-container">
    <b-table
      v-if="videos && videos.length > 0"
      :data="videos"
      :opened-detailed="firstIndex"
      detailed
      detail-key="_id">
      <template
        slot-scope="props">
        <b-table-column
          field="title"
          label="Name">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column
          field="created_at"
          label="Date"
          centered>
          <span class="tag is-success">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column
          field="metadata.mux_playback"
          label="Mux Playback URL"
          centered>
          <b-icon
            icon="content-copy"
            class="copy-icon"
            @click.native="handleCopy(props.row.metadata.mux_playback_url)"/>
        </b-table-column>
      </template>
      <template
        slot="detail"
        slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-250">
              <a
                :href="`https://app.cosmicjs.com/${$store.state.settings.cosmic.slug}/edit-object/${props.row.id}`"
                target="_blank">
                <img
                  :src="`https://image.mux.com/${props.row.metadata.mux_playback_id}/thumbnail.png?width=250`"
                  @error="imageNotAvailable($event)">
              </a>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Cosmic Slug:</strong>
                <br>
                <span>{{ props.row.slug }}</span>
                <span>
                  <b-icon
                    size="is-small"
                    icon="open-in-new"
                    class="copy-icon pad"
                    @click.native="openWindow(props.row.id)" />
                </span>
                <br>
                <br>
                <strong>Mux ID:</strong>
                <br>
                <span>{{ props.row.metadata.mux_id }}</span>
                <span>
                  <b-icon
                    size="is-small"
                    icon="content-copy"
                    class="copy-icon pad"
                    @click.native="handleCopy(props.row.metadata.mux_id)" />
                </span>
                <br>
                <br>
                <strong>Mux Playback URL:</strong>
                <br>
                <span>{{ props.row.metadata.mux_playback_url }}</span>
                <span>
                  <b-icon
                    size="is-small"
                    icon="content-copy"
                    class="copy-icon pad"
                    @click.native="handleCopy(props.row.metadata.mux_playback_url)" />
                </span>
              </p>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    videos() {
      return this.$store.state.videos;
    },
    firstIndex() {
      return this.$store.state.videos.length > 0 ? [this.$store.state.videos[0].id] : [];
    },
  },
  methods: {
    handleCopy(text) {
      if( this.$clipboard(text)) {
        this.$toast.open({
          message: 'Copied to clipboard!',
          type: 'is-success',
          queue: false
        });
      } else {
        this.$toast.open({
          message: 'Copy not supported. Do manually',
          type: 'is-warning',
          queue: false
        })
      }
    },
    openWindow(id) {
      window.open(`https://app.cosmicjs.com/${this.$store.state.settings.cosmic.slug}/edit-object/${id}`);
    },
    imageNotAvailable(event) {
      const imageUrl = event.target.src;
      event.target.src = "https://imgix.cosmicjs.com/4cb84b80-27ab-11ec-bc05-c54d649deec6-placeholder.gif";
      const polling = setInterval(async () => {
        try {
          axios.get(imageUrl);
          event.target.src = imageUrl;
          clearInterval(polling);
        } catch(e){
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.video-container {
  margin-top: 30px;
}
.image.is-250 {
  width: 250px;
}
.copy-icon.pad {
  padding-left: 5px;
}
.copy-icon:hover {
  cursor: pointer;
}
</style>

