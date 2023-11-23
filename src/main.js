import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/base.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faHouse,
  faCartShopping,
  faReceipt,
  faUser,
  faLocationDot,
  faMagnifyingGlass,
  faChevronLeft,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'

import {
  faBell as farBell,
  faCircleCheck as farCircleCheck
} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
  faHouse,
  faCartShopping,
  faReceipt,
  faUser,
  faLocationDot,
  farBell,
  faMagnifyingGlass,
  faChevronLeft,
  farCircleCheck,
  faCircleCheck
)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
