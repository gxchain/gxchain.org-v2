
export default () => {
	return {
		baseHost: '',
		route: '/',
		lang: 'ch',
		isDark: false,
		isBannerBg: true,
		
		nowDate: new Date(),
		clientWidth: 0,
		clientHeight: 0,

		navList: [],
		configMap: {},
		introList: [],

		weekRows: [],
		sideNews: [],
		newsList: [],
		newsRow: null,

		transNum: 0,
		priceTrend: [],
		accountNum: 0,
		nodeList: [],
	}
}

