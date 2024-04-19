import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
//import { uploader } from './multer.js'
import handlebars from 'express-handlebars' 
import { Server } from 'socket.io'
import productsSocket from './utils/productsSocket.js'
import bodyParser from 'body-parser'

//import { __dirname } from './utils.js'


const app = express()

const httpServer = app.listen(8080, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})

const io = new Server(httpServer)

app.use(productsSocket(io))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine());
//app.use(express.static(__dirname+'/public'))
app.set('views'. __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

// http://localhost:8080 + /api/carts
app.use('/api/carts', cartsRouter)

app.use('/api/products', productsRouter)




app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})


