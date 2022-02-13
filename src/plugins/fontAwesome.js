import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCheckSquare, faPlus, faSquare, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faPlus, faSquare, faCheckSquare, faCheck)

export default {
  install(app) {
    app.component('FontAwesomeIcon', FontAwesomeIcon)
  },
}
