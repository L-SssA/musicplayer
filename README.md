# 只有一页的播放器


> 需要[著名网易云音乐API](https://github.com/Binaryify/NeteaseCloudMusicApi)的支持

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### 常见问题

#### Cannot find module `vue-loader-v16/package.json`？
由于`vue-loader-v16`部分文件未能在国内网络中下载，因此只能通过国内镜像重新安装此包
  
先卸载vue-loader-v16  
> npm uninstall vue-loader-v16

再使用国内镜像重新安装  
> cnpm install vue-loader-v16  

