

function domLoaded() {
    const formulario = document.getElementById('login-form');
    // Adiciona um ouvinte de evento para o evento de envio do formulário
    formulario.addEventListener('submit', function (event) {
        // Impede o envio padrão do formulário
        event.preventDefault();
        const senha1 = document.getElementById("senha1").value
        const senha2 = document.getElementById("senha2").value
        if ( senha1 != senha2){
            alert("Invalid passwords")
        }
        else{
            window.location.href = "./index.html"
        }
        
    });
}
