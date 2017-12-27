import Vue from 'vue'
import App from './App.vue'
import Auth from './auth.vue'
import Todos from './todos.vue'
import './styles/main.scss'

new Vue({
	el: '#app',
	render: h => h(Todos)
})
