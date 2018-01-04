import Vue from 'vue'
import App from './App.vue'
import Auth from './auth.vue'
import Todos from './todos.vue'
import VueInputAutowidth from 'vue-input-autowidth'

Vue.use(VueInputAutowidth)

import Weather from './weather'
import axios from 'axios'

import './styles/main.scss'

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5'
axios.defaults.params = {
	appid: 'b76499690ebcc33429b017b9ec5cee77',
	units: 'metric'
}

new Vue({
	el: '#app',
	render: h => h(Weather)
})
