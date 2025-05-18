import menuArray from "./data.js"
const menuItem = document.getElementById('menu-item')
const orderCheckout = document.getElementById('order-checkout')
const cardDetailsForm = document.getElementById("card-details-form")
const orderConfirmation = document.querySelector('.order-confirmation');
const formSection = document.getElementById('form-section')

let orderArray = []; // Store selected items

formSection.addEventListener('submit', function(e){
    e.preventDefault();
    cardDetailsForm.style.display= 'none'
    orderCheckout.style.display = 'none'
    orderConfirmation.style.display = 'block';
})   

document.addEventListener('click', function (e) {
    console.log(e.target)
    if (e.target.dataset.checkout) {
        handleClick(e.target.dataset.checkout)
    }else if(e.target.id === 'complete-order'){
        console.log(e.target.id)
        myCard()   
    }else if(e.target.id === 'order-confirmation'){   
        
        
        console.log("Form Submitted")
        orderConfirm()
    }
})



function orderConfirm(){
    orderConfirmation.style.display = 'block'
   
}


function myCard(){
    cardDetailsForm.style.display = "flex"
    
}

function handleClick(id) {
    const targetItem = menuArray.find(menu => menu.id == id); // Ensure id matches correctly

    if (!orderArray.includes(targetItem)) {
        orderArray.push(targetItem); // Add item if not already in order
    }

    renderOrder(); // Update the order checkout section
}

function renderOrder() {
    
    if (orderArray.length === 0) {
        
        orderCheckout.style.display = 'none'; // Hide when empty
        return;
    } else {
        orderCheckout.style.display = 'block'; // Show when items are added
    }
    let orderHTML = `<h1 class="urorder">Your Order</h1>`;
    let totalPrice = 0;

    orderArray.forEach(item => {
        orderHTML += `
            <div class="flexorder-container">
                <h1>${item.name}</h1>
                <button class="order-button" data-remove="${item.id}">Remove</button>
                <h4>$${item.price}</h4>
            </div>`

        totalPrice += item.price;
    });

    orderHTML += `
    <div class="newhr"></div> 
        <div class="flexorder-container">        
            <h1>Total Price</h1>
            <h4>$${totalPrice}</h4>
        </div>
        <button id="complete-order">Complete Order</button>`

    document.getElementById('order-checkout').innerHTML = orderHTML;
}

// Event listener to handle remove button
document.addEventListener('click', function (e) {
    if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove);
    }
});

function removeItem(id) {
    orderArray = orderArray.filter(item => item.id != id); // Remove item by filtering
    renderOrder(); // Re-render the updated order
}


function render() {
    orderCheckout.style.display = 'none'
   
    let menuHTML = ""
    menuArray.forEach(function (item) {
        menuHTML += ` <div class="flex-container">
                        <div class="flex-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h1>${item.name}</h1>
                            <p>${item.ingredients.join(", ")}</p> <!-- Join array for better readability -->
                            <h4>$${item.price}</h4>
                        </div>
                        <button data-checkout="${item.id}">+</button>     
                    </div>                
                    </div>`
    })
    menuItem.innerHTML = menuHTML;

}
document.addEventListener("DOMContentLoaded", function () {
    render();  // Ensure the menu renders only after DOM loads
});
