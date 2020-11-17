export default {
	setData(state, data) {
		for(const key in data) state[key] = data[key]
	},
}