
process.on("message", message => {
    let resultado = 0;

    for ( let i = 0; i < 5e9; i++ ){
        resultado += i; 
    }

    process.send(resultado); 
})
