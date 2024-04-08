import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
//import { __dirname } from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(express.static(__dirname+'/public'))


// http://localhost:8080 + /api/carts
app.use('/api/carts', cartsRouter)

app.use('/api/products', productsRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

app.listen(8080, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})