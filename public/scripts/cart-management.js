const addButtonElemt = document.querySelector("#product-details .btn");
const badgeElemt = document.querySelector(".badge");

async function addItem() {
  const productId = addButtonElemt.dataset.id;
  let response;
  try {
    response = await fetch("/cart/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
  } catch (error) {
    alert("something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("something went wrong!");
    return;
  }

  const responseData = await response.json();
  badgeElemt.textContent = responseData.newTotalItems;
}

addButtonElemt.addEventListener("click", addItem);
