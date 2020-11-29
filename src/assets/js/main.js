// import 'popper.js';
// import 'bootstrap';
import 'bootstrap/js/src/util.js';
import 'bootstrap/js/src/modal.js'; //модалки
// import 'bootstrap/js/src/tab.js'; //табы
// import 'bootstrap/js/src/collapse.js'; //аккордеоны

import uiInits from './init';
import pageViget from '../../blocks/pages-viget/script';

const ready = (callback) => {
	document.readyState != "loading" ? callback() : document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {

	// inits
	uiInits.init();
	pageViget.init();
});
