const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son validos. 
    Necesitamos recibir los siguientes datos:
    - Nombre: String, peeeero recibimos lo siguiente: ${usuario.nombre}
    - Apellido: String, peeeero recibimos ${usuario.apellido}
    - Email: String, peeero recibimos ${usuario.email}
    `
}

export default generarInfoError; 