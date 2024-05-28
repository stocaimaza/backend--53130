const respuesta = (res, status, message) => {
    res.status(status).json({message});
}

export default respuesta; 