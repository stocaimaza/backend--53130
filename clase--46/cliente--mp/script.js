//Integramos MercadoPago del lado del cliente

const mp = new MercadoPago("APP_USR-ee215b4c-e6db-4c7d-a1f5-bf1e553a0f78", {
    locale:"es-AR"
}); 

document.getElementById("checkout-btn").addEventListener("click",  async () => {
    try {
        //Paso los datos del producto: 
        const orderData = {
            title: "Patito", 
            quantity: 1, 
            price: 100
        }

        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(orderData)
        })

        const preference = await response.json(); 
        createCheckoutButton(preference.id); 

    } catch (error) {
        alert("Error fataaaaaaaal"); 
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();
    const renderComponent = async () => {
        //Correccion para evitar que se dupliquen los botones:
        //if(window.checkoutButton) window.checkoutButton.unmount(); 
            //Si ya existe el boton, desmontalo. 
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent();
}