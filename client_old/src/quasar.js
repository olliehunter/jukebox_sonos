import Vue from 'vue';

import './styles/quasar.sass';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  QLayout,
  QPageContainer,
  QPage,
  QHeader,
  QFooter,
  QDrawer,
  QPageSticky,
  QPageScroller,
  QBtn
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  plugins: {
  },
  components: {
    QLayout,
    QPageContainer,
    QPage,
    QHeader,
    QFooter,
    QDrawer,
    QPageSticky,
    QPageScroller,
    QBtn
  },
});