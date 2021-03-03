<template>
  <div class="app">
    <a-input type="text" @pressEnter="search" v-model:value="searchKey" />
    <a-table
      :columns="columns"
      :data-source="songList"
      :rowKey="(record) => record.id"
      @change="changeHandler"
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
import musciApi from "@/utils/http/api_music.js";

export default {
  components: {
    LyricBox
  },
  data () {
    return {
      searchKey: "",
      limit: 30,
      offset: 0,
      songList: [],
      songCount: 0,
      columns: [
        {
          title: "歌名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "歌手",
          dataIndex: "artists[0].name",
          key: "artists"
        },
        {
          title: "操作",
          key: "control",
          slots: { customRender: "control" }
        }
      ],
      currentSong: null,
      lyric: [],
      currentLineIndex: 0
    };
  },
  methods: {
    async search (isSearch = true) {
      if (isSearch) {
        this.offset = 0;
        this.limit = 30;
      }

      const { songs, songCount } = await musciApi.search(
        this.searchKey,
        this.limit,
        this.offset
      );

      this.songCount = songCount;
      this.songList = [...this.songList, ...songs];
    },
    async play (id) {
      this.currentSong = (await musciApi.songURL(id))[0];

      this.lyric = (await musciApi.lyric(id)).lrc.lyric
        .split("\n")
        .map(item => {
          if (!item) return;
          const splitArray = item.split("]");
          const timeArr = splitArray[0].split("[")[1].split(":");
          const time = parseFloat(timeArr[0]) * 60 + parseFloat(timeArr[1]);
          const text = splitArray[1];
          return {
            time,
            text
          };
        })
        .filter(item => item);

      console.log(this.lyric);
    },
    lyricSync () {
      for (let i = 0; i < this.lyric.length; i++) {
        const item = this.lyric[i];
        if (item.time >= this.$refs.player.currentTime) {
          this.currentLineIndex = i - 1;
          break;
        }
      }
    },

    changeHandler (pagination) {
      if (
        pagination.current ===
        Math.ceil(this.songList.length / pagination.pageSize) &&
        this.songList.length < this.songCount
      ) {
        this.offset++;

        if ((this.offset + 1) * this.limit > this.songCount) {
          this.limit = this.songCount - this.offset * this.limit;
        }

        this.search(false);
      }
    }
  }
};
</script>

<style scoped></style>
