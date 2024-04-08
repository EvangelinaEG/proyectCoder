import fs from 'fs'

export default class CartManager {  
      
    constructor(path){
        this.path = path
    }

    leerArchivo = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataJson)            
        } catch (error) {
            return []
        }
    } 



    addCart = async cart => {
        try {
            const carts = await this.leerArchivo()
           
            if(carts.length === 0) {
                cart.id = 1
            } else {
                cart.id = carts.length + 1
            }
            
            const cartId = carts.findIndex(c => c.id === cart.id)

            if( cartId!== -1 ) {
                return {"status" : "error", "msg":'El carrito ya existe'}
            }
            carts.push(cart)

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')
            return {"status" : "success", "msg": carts }   
            
        } catch (error) {
            return {"status" : "error", "msg": error }   
            console.log(error)
        }
    }
    getCartById= async (id) => {
        try {
            const carts = await this.leerArchivo()
            const cartId= carts.findIndex(cart => parseInt(id.cid) === cart.id)

            if( cartId=== -1 ) {
                return {"status" : "error", "msg":'carrito no encontrado'}
            }
            const cart = carts[cartId]

            return {"status" : "success", "msg": cart }
            

        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async (id, product) => {
        try {

            const carts = await this.leerArchivo()
            const cartId = carts.findIndex(c =>  parseInt(id.cid)  === c.id)
            
            if( cartId === -1 ) {
                return {"status" : "error", "msg": 'El carrito no existe'}
            }
            const cart = carts.find(c => parseInt(id.cid) == c.id)
            
            const pro = cart.products.findIndex(pro => pro.product === parseInt(product.pid))
            console.log(pro)
            if( pro === -1 ) {
                const pr = {"product": parseInt(product.pid), "quantity": 1}
                cart.products.push(pr)
            }else{
                cart.products[pro].quantity++
            }

            carts[cartId] = { id: parseInt(id.cid),  ...cart }
          
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')
            return {"status" : "success", "msg": carts }    
            
        } catch (error) {
            console.log(error)
        }
    }


}

  