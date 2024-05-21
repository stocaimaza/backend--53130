//5) Listeners

//process.on() es un método que me permite registrar escuchadores de eventos (listeners), para los eventos que ocurran en el proceso. 

//Eventos más utilizados: 

//on "exit": para ejecutar un código justo antes de la finalización del proceso. 

process.on("exit", (code) => {
    console.log("Este codigo se ejecuta siempre antse de terminar el proceso, codigo de salida:", code);
})


console.log("Texto adicional");

//Excepciones no controladas: on "uncaughtException"

process.on("uncaughtException", (error) => {
    console.log("Tuvimos que capturar un error:", error);
    process.exitCode = 1; 
})

firulais();