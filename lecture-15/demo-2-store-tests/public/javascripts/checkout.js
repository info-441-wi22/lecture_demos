let totalCost = 0;

async function init(){
    await loadCart();

    if(totalCost > 0){
        loadPaypal();
    }
}

async function loadCart(){
    document.getElementById("yourcartdiv").innerHTML = "Loading...";

    //load items from server
    let response = await fetch("/items/getCart");
    let cartJson = await response.json();

    //display cart items

    let cartHTML = cartJson.map(itemInfo => {
        totalCost += itemInfo.price * itemInfo.itemCount;
        
        return `
        <hr>
        <div>
            <h3>Item: ${itemInfo.name}</h3>
            <strong>Price: </strong>$${itemInfo.price}<br>
            <strong>Count</strong> ${itemInfo.itemCount}
        </div>`
    }).join("<hr>")
    
    document.getElementById("yourcartdiv").innerHTML = cartHTML;
    document.getElementById("total_price").innerText = totalCost;
}

function loadPaypal(){
    paypal.Buttons({
        style: {
          layout: 'vertical',
          color:  'blue',
          shape:  'rect',
          label:  'paypal',
        },
        createOrder: function(data, actions) {
            // Set up the transaction
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value:  '' + totalCost
                }
              }]
            });
          }
      }).render('#paypaldiv');

}