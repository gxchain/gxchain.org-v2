
// import LRUCache from 'lru-cache'
// import { cacheAdapterEnhancer } from 'axios-extensions'

export default function({ $axios, redirect }) {
	$axios.setBaseURL('https://tablo.fun/app/17')

	// https://www.yuque.com/louwenkang/ypz71r/pflmez
	// const lruConfig = new LRUCache({
	// 	maxAge: 3600e3,
	// 	max: 100,
	// })
	// $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter, {
	// 	enabledByDefault: false,
	// 	cacheFlag: 'useCache',
	// 	defaultCache: lruConfig,
	// })

	$axios.onError(error => {
		const { status } = error.response || {}
		console.log('axios err', status)
		if (status === 400) {
			redirect('/400')
		}
	})
}