import { Router } from 'express'
import express from 'express'
import ProductManager from '../file/productManager.js'
const path = '../proyecto/file/Productos.json'

const router = Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))


const Products = new ProductManager(path)

const main = async () =>{
    Products
}

main()


router.get('/', async (req, res) => {
    let limit = req.query.limit? req.query.limit : ''
    const result = await Products.getProducts(limit)
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.send(result)
})

// enpoint para crear un usuario
router.post('/', async (req, res) => {
    const result = await Products.addProduct(req.body)  
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.status(200).send({ status: 'success', payload: result })
})

router.get('/:pid', async(req, res)=>{
    const {pid} = req.params
    const result = await Products.getProductById({pid})
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.send({status: 'success', payload: result})
    
})
// Endpoint para actualizar un producto
router.put('/:pid', async(req, res) => {
    const { pid } = req.params
    const userToUpdate = req.body
    const result = await Products.updateProduct({ pid }, userToUpdate)
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.send({status: 'success', payload: result})

})

// endpoint para eliminar un producto
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await Products.deleteProduct({pid})
    if(  result.status == "error" ) return res.status(404).send({status: 'error', error: result.msg })
    res.send({status: 'success', payload: result})
})


export default router
