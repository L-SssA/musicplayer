import axios from "axios";

export const search = async function (keywords, limit = 30, offset = 0) {
  const {
    data: { result }
  } = await axios.get(
    `http://localhost:3000/search?keywords=${keywords}&limit=${limit}&offset=${offset}`
  );

  return result;
};

export const songURL = async function (id) {
  const {
    data: { data }
  } = await axios.get(`/song/url?id=${id}`);

  // console.log(data);

  return data;
};

export const lyric = async function (id) {
  const { data } = await axios.get(`http://localhost:3000/lyric?id=${id}`);

  // console.log(data);

  return data;
};

export default {
  search,
  songURL,
  lyric
};
