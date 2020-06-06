import express from 'express'
import routes from './routes'
import path from 'path'

const app = express()
app.use(express.json()) 
app.use('/uploads', routes.use(express.static(path.resolve(__dirname,'..', 'uploads'))))

app.use(routes)

app.listen(3333, () => console.log(' server listening on port 3333'))