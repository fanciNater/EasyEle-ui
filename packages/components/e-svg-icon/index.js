import ESvgIcon from './src/main.vue'
import AssetsLoader from '../../assets-loader'

ESvgIcon.install = (vue) => {
  AssetsLoader.requireAllSvg()
  vue.component(ESvgIcon.name, ESvgIcon)
}

export default ESvgIcon
