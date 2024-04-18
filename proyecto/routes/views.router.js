import { Router } from 'express'
import express from 'express'
import ProductManager from '../file/productManager.js'
import { productsSocket } from '../server.js'
const path = '../proyecto/file/Productos.json'

const router = Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


const Products = new ProductManager(path)

const products = async () =>{
   const prods =  await Products.getProducts()
   return prods
}
products();

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
    res.render('realTimeProducts', { 
    "products": result.msg,
    "contproducts" :  keys.length > 0
    })
})

router.post('/realtimeproductos', productsSocket,  async (req, res) => {
    console.log(req)
    const result = await Products.addProducts(req)
    let keys = Object.keys(result);
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.render('realTimeProducts', { 
    "products": result.msg,
    "contproducts" :  keys.length > 0
    })
    productsSocket.on('connection', socket =>{
        socket.on("product", async data=>{
            const result = await Products.addProduct(data)  
            
            socketServer.emit("message-server", result.msg)
        })
    }) 
})
/* */
export default router