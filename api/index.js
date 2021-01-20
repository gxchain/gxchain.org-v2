const app = require('express')()
const axios = require('axios')

app.get('/news', async (req, res) => {
	try {
		const { data } = await axios.get('http://localhost:1061/app/17/data/list/news', {
			params: req.query,
		})
		res.send(data)
	} catch (error) {
		res.status(500).send({
			msg: error.message,
			name: error.name,
		})
	}
})

module.exports = app