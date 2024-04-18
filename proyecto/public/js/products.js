const socket = io();
const form = document.getElementById("producto")

const productsList = document.getElementById('productos')
//const datos = '';
form.addEventListener("submit", (event) =>{
    event.preventDefault()
    const files = document.getElementById("thumbnail").files.length;
    	const data = new FormData(event.target)
        const thumbnails = []
     for (let i = 0; i < files; i++) {
        let url = '/uploads/'+document.getElementById('thumbnail').files[i].name
        thumbnails.push(url)
    } 
    
    data.append("thumbnails", JSON.stringify(thumbnails))
    
   
    if(data.get('title') === '' || data.get('description') === '' || data.get('code') === '' || data.get('price') === '' || data.get('status') === '' || data.get('stock') === '' || data.get('category') === ''  ){
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
            'title': data.get('title'),
            'description': data.get('description'),
            'code': data.get('code'),
            'price': data.get('price'),
            'status': data.get('status'),
            'stock': data.get('stock'),
            'category': data.get('category'),
            'thumbnail': data.get('thumbnails'),
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
