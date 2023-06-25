

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

    setTimeout(function () {
        loading_element.style.display = "none"
        let len = 0;
        for (let index = 0; index < products_list.length; index++) {
            const element = products_list[index];
            if (element.name.toLowerCase().includes(name.toLowerCase())){
                len++;
                
                element.element.style.display = "block"
            }else
                element.element.style.display = "none"
            search_locked = false
            if ( name != "")
            document.getElementById("results-for-text").style.display = "block"
            let texto = len+" Resultados para: "+name
            if (len == 0) {
                texto = "Sem resultados para: "+name
            }else if ( len == 1) {
                texto = "Foi encontrado 1 resultado para: "+name
            }
            document.getElementById("results-for-text").innerText = texto

        }
    }, 2000)

}







function domLoaded() {
    produto_template = document.getElementById("product-template")
    produto_template.style.display = "none"
    list = document.getElementById("product-list")
    document.getElementById("results-for-text").style.display = "none"
    const products = [
        {
            "price": "312,00 R$",
            "name": "INTEGRITY+ TREADMILL",
            "image": "https://www.lifefitness.com/resource/image/2323806/portrait_ratio1x1/400/400/7dd2288b7752d5c03eb03fe195226832/ER/life-fitness-integrity-series-treadmill-with-24-inch-se4-in-matte-black.png"
        },
        {
            "price": "300,00 R$",
            "name": "TOTAL BODY ARC TRAINER",
            "image": "https://www.lifefitness.com/resource/image/2323834/portrait_ratio1x1/400/400/d4f7d5e88c3da28086f3f554c014be7e/MD/life-fitness-integrity-series-total-body-arc-with-24-inch-se4-in-black-onyx.png"
        },
        {
            "price": "3000,00 R$",
            "name": "ASPIRE TREADMILL",
            "image": "https://www.lifefitness.com/resource/image/2272264/portrait_ratio1x1/400/400/a0fa251b9651a66222cef00343427707/DZ/aspire-treadmill-sl-console-smooth-charcoal.png"
        },
        {
            "price": "1234,00 R$",
            "name": "INTEGRITY+ ELLIPTICAL CROSS-TRAINER",
            "image": "https://www.lifefitness.com/resource/image/2323812/portrait_ratio1x1/400/400/bda61656e4cafb677c3155fb0ada278f/fN/life-fitness-integrity-series-elliptical-cross-trainer-with-24-inch-se4-in-black-onyx.png"
        },
        {
            "price": "1120,00 R$",
            "name": "IC7 INDOOR CYCLEL",
            "image": "https://www.lifefitness.com/resource/image/2304864/portrait_ratio1x1/400/400/f4ec30b7055c253347c16892323ed587/ST/icg-ic7-bg-free.png"
        },
        {
            "price": "1310,00 R$",
            "name": "INTEGRITY+ LIFECYCLE UPRIGHT BIKE",
            "image": "https://www.lifefitness.com/resource/image/2323830/portrait_ratio1x1/400/400/2f9c8d4451fe2ddd27e741575c725fb4/CB/life-fitness-integrity-series-upright-bike-with-24-inch-se4-in-black-onyx.png"
        }
    ]


    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        add_to_cart(element)
    }



    console.table(products)


}



