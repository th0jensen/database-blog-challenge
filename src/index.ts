import app from './server'

const port = 3030

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})
