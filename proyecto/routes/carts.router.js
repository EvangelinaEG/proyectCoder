import { Router } from 'express'
import express from 'express'
import CartManager from '../file/cartManager.js'
import ProductManager from '../file/productManager.js'
const path = '../proyecto/file/Carrito.json'
const path2 = '../proyecto/file/Productos.json'
const router = Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))
// definiendo los distos métodos de crud de carrito

const Carts = new CartManager(path)
const Products = new ProductManager(path2)

const main = async () =>{
    Carts
}

main()

router.get('/:cid', async(req, res)=>{
    const {cid} = req.params
    const result = await Carts.getCartById({cid})
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.send({status: 'success', payload: result})
})

router.post('/', async (req, res) => {
    const rta = await Products.validar(req.body);
    if(rta){
        const result = await Carts.addCart(req.body)  
        if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
        res.status(200).send({ status: 'success', payload: result })
    }else{
        res.status(404).send({ status: 'error', payload: "Algunos productos que intentan cargase al carrito no existen" })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    const {cid} = req.params
    const {pid} = req.params
    const result = await Carts.updateCart({cid}, {pid})  
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.status(200).send({ status: 'success', payload: result })
})

export default router