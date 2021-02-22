<template>
  <div class="app">
    <a-input type="text" @pressEnter="search" v-model:value="searchKey" />
    <a-table
      :columns="columns"
      :data-source="songList"
      :rowKey="(record) => record.id"
    >
      <template #control="{ record }">
        <a-button @click="play(record.id)">播放</a-button>
      </template>
    </a-table>
    <audio
      :src="currentSong?.url"
      controls
      autoplay
      ref="player"
      @timeupdate="lyricSync"
      @ended="currentLineIndex = 0"
    />
  </div>
  <lyric-box :lyric="lyric" :lineIndex="currentLineIndex"></lyric-box>
</template>

<script>
import axios from "axios";
import LyricBox from "~c/LyricBox";

export default {
  components: {
    LyricBox,
  },
  data() {
    return {
      searchKey: "",
      songList: [],
      columns: [
        {
          title: "歌名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "歌手",
          dataIndex: "artists[0].name",
          key: "artists",
        },
        {
          title: "操作",
          key: "control",
          slots: { customRender: "control" },
        },
      ],
      currentSong: null,
      lyric: [],
      currentLineIndex: 0,
    };
  },
  methods: {
    search() {
      axios
        .get(`http://localhost:3000/search?keywords=${this.searchKey}`)
        .then((res) => {
          // console.log(res);
          this.songList = res.data.result.songs;
        });
    },
    async play(id) {
      this.currentSong = (await axios.get(`/song/url?id=${id}`)).data.data[0];

      this.lyric = (
        await axios.get(`http://localhost:3000/lyric?id=${id}`)
      ).data.lrc.lyric
        .split("\n")
        .map((item) => {
          if (!item) return { time: 9999, text: "end" };
          const splitArray = item.split("]");
          const timeArr = splitArray[0].split("[")[1].split(":");
          const time = parseFloat(timeArr[0]) * 60 + parseFloat(timeArr[1]);
          const text = splitArray[1];
          return {
            time,
            text,
          };
        });
    },
    lyricSync() {
      for (let i = 0; i < this.lyric.length; i++) {
        const item = this.lyric[i];
        if (item.time >= this.$refs.player.currentTime) {
          this.currentLineIndex = i - 1;
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>