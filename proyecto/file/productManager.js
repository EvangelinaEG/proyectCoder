import fs from 'fs'

export default class ProductManager {  
      
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

    getProducts = async (limit) => {
        const productos = await this.leerArchivo()
        const nuevolistado = limit === ''? productos : productos.slice(0, limit) 
        return {"status" : "success", "msg":  nuevolistado }
    }

    addProduct = async producto => {
        try {
            const productos = await this.leerArchivo()
           
            if(productos.length === 0) {
                producto.id = 1
            } else {
                producto.id = productos.length + 1
            }
            if(producto.title === '' || producto.description === '' || producto.price === '' || producto.code === '' || producto.stock === '' || producto.status === ''){
                return {"status" : "error", "msg":'Todos los campos son obligatorios, corrobore'}
            }
            const productId = productos.findIndex(pro => producto.code === pro.code)

            if( productId!== -1 ) {
                return {"status" : "error", "msg":'El producto ya existe'}
            }
            productos.push(producto)

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'), 'utf-8')
            return {"status" : "success", "msg": "Producto agregado correctamente" }   
            
        } catch (error) {
            return {"status" : "error", "msg": error }   
            console.log(error)
        }
    }
    getProductById = async (id) => {
        try {
            //console.log(id)
            const productos = await this.leerArchivo()
            const productId= productos.findIndex(pro => parseInt(id.pid) === pro.id)

            if( productId=== -1 ) {
                return {"status" : "error", "msg":'producto no encontrado'}
            }
            const product = productos[productId]

            return {"status" : "success", "msg": product }
            

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (id, product) => {
        try {
            
            const productos = await this.leerArchivo()
            const productId = productos.findIndex(pro => parseInt(id.pid)  === pro.id)
            
            if( productId === -1 ) {
                return {"status" : "error", "msg": 'El producto no existe'}
            }

            const code = productos.findIndex(pro => product.code === pro.code)

            if( code!== -1 ) {
                return {"status" : "error", "msg": 'El code del producto que intenta modificar ya se encuentra utilizado en otro producto.' }   
            }

            productos[productId] = { id: parseInt(id.pid),  ...product }
          
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'), 'utf-8')
            return {"status" : "success", "msg": productos }    
            
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const productos = await this.leerArchivo()
            const productId= productos.findIndex(pro => parseInt(id.pid) === pro.id)

            if( productId=== -1 ) {
                return {"status" : "error", "msg": 'producto no encontrado' }
            }
            productos.splice(productId, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'), 'utf-8')
            return {"status" : "success", "msg": productos }     

        } catch (error) {
            console.log(error)
        }
    }

    validar =  async (products) => {
        try{
            let cont = 0
            const productos = await this.leerArchivo()
            await products.products.map(function (pro) {
                let val = productos.findIndex(p => parseInt(pro.product) === p.id)
                if(val === -1) { cont++ }
              });
            return (cont === 0)
        } catch (error){
            console.log(error)
        }
    }
}

  