import { Router } from 'express'
import express from 'express'
import ProductManager from '../file/productManager.js'
const path = '../proyecto/file/Productos.json'
import bodyParser from 'body-parser'
const router = Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(bodyParser.urlencoded({ extended: false }))

const Products = new ProductManager(path)

const products = async () =>{
   const prods =  await Products.getProducts()
   return prods
}
products();

router.post('/realtimeproducto', async (req, res) => {
    console.log(req.body.title)
        const { socketServer } = req
        socketServer.on('connection', socket => {
            socket.on("product", async data=>{
            const result = await Products.addProducts(data)
            
                socketServer.emit("message-server", result.msg)
            })
        }) 
        
    }) 

router.get('/realtimeproductos', async (req, res) => {
    
    const result = await Products.getProducts()
    let keys = Object.keys(result);
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.render('realTimeProducts', { 
    "products": result.msg,
    "contproducts" :  keys.length > 0
    })
})

router.get('/', async (req, res) => {
    const result = await Products.getProducts()
    let keys = Object.keys(result);
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.render('home', { 
    "products": result.msg,
    "contproducts" :  keys.length > 0
    })
})






export default router