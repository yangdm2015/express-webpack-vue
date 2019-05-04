// require('../css/style.css');
import App from '../app1.vue';

//document.body.innerHTML="webpack";
import Vue from 'vue';
new Vue({
	el: '#app',
	render: h => h(App),
})

