

var produto_template;
var list;





let products_list = []

let search_locked = false

function add_to_cart(product) {
    let clone = produto_template.cloneNode(true)
    clone.querySelector("#name").textContent = product.name
    clone.querySelector("#price").textContent = product.price
    clone.querySelector("#image").src = product.image
    clone.style.display = "block"
    list.appendChild(clone)
    products_list.push(product)
    product.element = clone
}






function search_input_key(event) {
    if (event.key == "Enter") {
        const text = event.target.value
        event.target.blur()
        update_filter(text)
    }
}


function search_icon_click() {
    const input = document.getElementById("search-input")
    let text = input.value
    input.blur();
    update_filter(text)
}


function update_filter(name) {
    if (search_locked) return
    search_locked = true
    this.value = ""
    let loading_element = document.getElementById("laoding-icon")
    loading_element.style.display = "flex"

    document.getElementById("results-for-text").style.display = "none"

    for (let index = 0; index < products_list.length; index++) {
        const element = products_list[index]
        element.element.style.display = "none"
    }

    setTimeout(async function () {
        loading_element.style.display = "none"
       
        const products = await get_products(name)
        const len = products.length

        products_list.map( (product) => {
            product.element.remove()
        })
        products_list = []

        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            add_to_cart(element)
        }

        let texto = len + " Resultados para: " + name
        if (len == 0) {
            texto = "Sem resultados para: " + name
        } else if (len == 1) {
            texto = "Foi encontrado 1 resultado para: " + name
        }

        document.getElementById("results-for-text").innerText = texto
        if ( name != "")
        document.getElementById("results-for-text").style.display = "block"
        search_locked = false
    }, 2000)

}


const url = "https://academia-x-api.glitch.me"


async function get_products(name) {
    name = name || ""
    const response = await fetch(`${url}/products?search=${encodeURIComponent(name)}`);
    const products = await response.json();
    return products
}



function domLoaded() {
    produto_template = document.getElementById("product-template")
    produto_template.style.display = "none"
    list = document.getElementById("product-list")
    document.getElementById("results-for-text").style.display = "none"

    get_products().then(products => {
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            add_to_cart(element)
        }
        console.table(products)
        document.getElementById("laoding-icon").style.display = "none"

    }).catch(e => console.log(e))
}



