import { Router } from 'express'
import express from 'express'
import ProductManager from '../file/productManager.js'
const path = '../proyecto/file/Productos.json'
import bodyParser from 'body-parser'
//import productsSocket from '../utils/productsSocket.js'
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

router.post('/realtimeproductos' , async (req, res) => {
    try {
        const { socketServer } = req
        const result = []
        socketServer.on('connection', socket => {
            socket.on('product', async data => {
                 result = await Products.addProduct(data)
                resutlt.push({id: socket.id, messge: result.msg})
            })
            socket.emit('message-server', result)    
        })

       
    }catch(err){
        console.log(err)
    }   
})
 
router.get('/realtimeproductos',async (req, res) => {
    try {
        const result = await Products.getProducts()
        let keys = Object.keys(result);
        if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
        res.render('realTimeProducts', { 
        "products": result.msg,
        "contproducts" :  keys.length > 0
        })
        
    }catch(err){
        console.log(err)
    }
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