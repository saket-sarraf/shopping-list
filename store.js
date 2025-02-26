if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
    var removecartitems = document.querySelectorAll('.btn-danger'); // Selects all elements with class 'btn-danger'

    removecartitems.forEach(function (but) {
        but.addEventListener('click', removecartitem);
    }
    );
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantitychanged)
    }
    var addtocartbutton = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addtocartbutton.length; i++) {
    var button = addtocartbutton[i]
    button.addEventListener('click', addtocartclicked)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',
    purchaseclicked
)
}
function removecartitem(event) {

    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.remove()
    updatecarttotal();

}
function quantitychanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatecarttotal()
}
function updatecarttotal() {
    var cartitemcontainer = document.getElementsByClassName('cart-items')[0]
    var cartrow = cartitemcontainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartrow.length; i++) {
        var cartr = cartrow[i];
        var priceElement = cartr.getElementsByClassName('cart-price')[0];
        var quantityele = cartr.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityele.value;
        total += (price * quantity);

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function addtocartclicked(event) {
    var button = event.target
    var shopitem = button.parentElement.parentElement
    var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopitem.getElementsByClassName('shop-item-image')[0].src
    additemtoCart(title, price, image)
    updatecarttotal()
}
function additemtoCart(title, price, image) {
    var cartrow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartitemnames = document.getElementsByClassName('cart-item-title')
    for(var i =0;i<cartitemnames.length;i++)
    {
        if(cartitemnames[i].innerText == title)
        {
            return;
        }
    }
    cartrow.classList.add('cart-row')
    var cartrowcontent = `
                           <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${image}" width="100" height="100">
                                <span class="cart-item-title">${title}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger" 
                                type="button">REMOVE</button>
                            </div>`
        cartrow.innerHTML = cartrowcontent;
    cartItems.append(cartrow);
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click',
        removecartitem
    )
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',
       quantitychanged 
    )
}function purchaseclicked()
{
    alert('thank you for your purchase')
    var cartitems = document.getElementsByClassName('cart-items')[0]
    while(cartitems.hasChildNodes())
        {
            cartitems.removeChild(cartitems.firstChild)
        } 
        updatecarttotal()
}