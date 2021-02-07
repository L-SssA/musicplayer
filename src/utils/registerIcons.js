import * as icons from '@ant-design/icons-vue';

const myIcons = ['UserOutlined', 'ProfileOutlined', 'HomeOutlined', 'VideoCameraOutlined', 'UploadOutlined', 'MenuUnfoldOutlined', 'MenuFoldOutlined']

export default function registerIcons(app) {
  Object.keys(icons).filter(r => myIcons.includes(r)).forEach(key => {
    app.component(key, icons[key])
  })
}