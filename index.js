function handleData(event){
    event.preventDefault();
    const itemDetails = {
        itemName: event.target.itemName.value,
        description: event.target.description.value,
        price:event.target.price.value,
        quantity:event.target.quantity.value,
    }

axios
    .post("https://crudcrud.com/api/72565713a28c4630a6fe91b09d3315cb/itemDetails", itemDetails)
    .then((response) => {
        displayItems(response.data);
    }).catch((err) => {
        console.log(err);
    });

    // clearing the input field
    document.getElementById("itemName").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
    document.getElementById("quantity").value = '';
}
function displayItems(itemDetails){
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(
        `Item Name: ${itemDetails.itemName} - Description: ${itemDetails.description} - Price: ${itemDetails.price} - Quantity: ${itemDetails.quantity}`
    ));

    const buyOne = document.createElement("button");
    buyOne.innerText = ("Buy One");

    const buyTwo = document.createElement("button");
    buyTwo.innerText = ("Buy Two");

    const buyThree = document.createElement("button");
    buyThree.innerText = ("Buy Three");
    
    listItem.appendChild(buyOne);
    listItem.appendChild(buyTwo);
    listItem.appendChild(buyThree);

    const itemDetailsList = document.querySelector("ul");
    itemDetailsList.appendChild(listItem);

    buyOne.addEventListener("click", function (event) {
        itemDetailsList.removeChild(event.target.parentElement)
        updateQuantity(itemDetails, 1);
    });

    buyTwo.addEventListener("click", function (event) {
        itemDetailsList.removeChild(event.target.parentElement)
        updateQuantity(itemDetails, 2);
    });

    buyThree.addEventListener("click", function (event) {
        itemDetailsList.removeChild(event.target.parentElement)
        updateQuantity(itemDetails, 3);
    });
   
} 
    function updateQuantity(itemDetails, quantityToBuy){
        const id = itemDetails._id;
        const updatedQuantity = parseInt(itemDetails.quantity) - quantityToBuy;
        if(updatedQuantity > quantityToBuy){
            axios.put(`https://crudcrud.com/api/72565713a28c4630a6fe91b09d3315cb/itemDetails/${id}`,
                {
                    itemName: itemDetails.itemName,
                    description: itemDetails.description,
                    price: itemDetails.price,
                    quantity: updatedQuantity,
                }
            ) .then((response) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            alert("Insufficient quantity available");
        }
    }


document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/72565713a28c4630a6fe91b09d3315cb/itemDetails")
    .then((response) => {
        for (let i=0; i<response.data.length; i++){
            displayItems(response.data[i]);
        }
  }).catch((err) => {
        console.log(err);
    });
  });