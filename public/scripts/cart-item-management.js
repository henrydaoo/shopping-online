const formElements = document.querySelectorAll(".cart-item-mangement");
const cartTotalPriceElemt = document.querySelector("#total");
const badgeElemt = document.querySelector(".badge");

async function updateItem(event) {
  event.preventDefault();

  const form = event.target;
  const productId = form.dataset.productid;
  const quantity = form.lastElementChild.firstElementChild.value;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("something went wrong");
    return;
  }

  const responseData = await response.json();

  badgeElemt.textContent = responseData.newTotalQuantity;
  cartTotalPriceElemt.textContent = responseData.newTotalPrice.toFixed(2);
}

for (const formElement of formElements) {
  formElement.addEventListener("submit", updateItem);
}
