const express = require('express')
const app = express()
const port = 3001
const fetch = require('cross-fetch')

app.use(express.static('public'))

app.get('/search', async (req, res) => {
    try {
        const countryName = req.query.country
        const apiResponse = await fetch(`http://restcountries.com/v3.1/name/${countryName}`) // fetch isn't being recognized for some reason that I haven't figured out yet.
            
        if (!apiResponse.ok) {
            throw new Error(`HTTP error status: ${apiResponse.status}`)
        }
        const data = await apiResponse.json()
        console.log(data)
        res.send(data)
    } catch(error) {
        res.status(500).send({message: error.message})
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})