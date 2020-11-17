// import './extend-date'
// import './extend-appear'

String.prototype.cutStr = function(pre = 100, trail = 0) {
	if(this.length <= pre + trail) return this
	let txt = this.substr(0, pre) + '...'
	if(trail) txt += this.substr(-trail)
	return txt
}

Array.prototype.sortBy = function(key, isDesc) {
	this.sort((a, b) => {
		return (isDesc ? -1 : 1) * (a[key] - b[key])
	})
}