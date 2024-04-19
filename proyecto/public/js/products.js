const socket = io()
const form = document.getElementById("producto")

const productsList = document.getElementById('productos')
//const datos = '';
form.addEventListener("submit", (event) =>{
   
    const files = document.getElementById("thumbnail").files.length;
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const status = document.getElementById("status").value
    const stock = document.getElementById("stock").value
    const code = document.getElementById("code").value
    const category = document.getElementById("category").value

    
        const thumbnails = []
     for (let i = 0; i < files; i++) {
        let url = '/uploads/'+document.getElementById('thumbnail').files[i].name
        thumbnails.push(url)
    } 
    
    const thumbs =  JSON.stringify(thumbnails)
    
   
    if(title === '' || description === '' || code === '' || price === '' || status === '' || stock === '' || category === '' ){
        Swal.fire({
            title: 'Atencion',
            input: 'text',
            text: 'Todos los campos son obligatorios! ',
            inputValidator: value => {
                return !value && 'Corrobore que todos los campos tengan valores y vuelva a intentar'
            },
            allowOutsideClick: false
        })
        
    }else{
       
        socket.emit("product", {
            'title': title,
            'description': description,
            'code': code,
            'price': price,
            'status': status,
            'stock': stock,
            'category': category,
            'thumbnail': thumbs,
        })
    }
})

form.reset()

socket.on("message-server", data=>{
    Swal.fire({
        title: 'Atencion',
        input: 'text',
        text: data,
        inputValidator: value => {
            return !value && data
        },
        allowOutsideClick: false
    })
})
 