const app = require('express')()
const Axios = require('axios')
const { fetchHtml } = require('./util')
const axios =  Axios.create({
	baseURL: 'http://172.19.45.147:1601/app/17',
})

app.get('/news', async (req, res) => {
	try {
		const { data } = await axios.get('/data/list/news', {
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

app.get('/news/:id', async (req, res) => {
	const { id } = req.params
	try {
		const {data: {row}} = await axios.get('/data/item/news?id=' + id)
		if(!row) throw new Error('记录不存在')
		if(!row.content && /chainnews/.test(row.link)) {
			try {
				const dat = await fetchHtml({
					url: row.link,
					args: ['#article_content@html']
				})
				row.content = dat.toUnicode()
				await axios.post('/data/upsert/news', {
					id: row.id,
					content: row.content,
				})
			} catch (error) {
				console.log(error.message)
			}
		}
		res.send(row)
	} catch (error) {
		res.status(500).send({
			msg: error.message,
			name: error.name,
		})
	}
})

module.exports = app