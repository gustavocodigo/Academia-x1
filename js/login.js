// exemplo de login
const email = "tedesco@email.com"
const senha="123"

function test_login(emailp, passwordp) {
    return (email === emailp && senha ==passwordp);
}



function domLoaded() {
    const formulario = document.getElementById('login-form');
    // Adiciona um ouvinte de evento para o evento de envio do formulário
    formulario.addEventListener('submit', function (event) {
        // Impede o envio padrão do formulário
        event.preventDefault();
        let logged = false
        logged = test_login(document.getElementById("email").value, document.getElementById("senha").value)
        if ( logged ) {
            window.location.href = "./index.html"
        }else {
            alert("Falha ao fazer login, usuário ou senha invalidos.")
        }
    
    });
}
