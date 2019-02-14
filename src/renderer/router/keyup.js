import axios from 'axios'
export function keyup() {
	// let _key = window.event.keyCode;
  return new Promise(function(reslove,reject){
	let keys = 112;
	document.onkeydown=e=>{
		let _key = window.event.keyCode;
		if(_key === keys){

			reslove(keys);
		console.log('success')

		}
	  }
  })
}

export default {
  keyup,
}
