const deleteBtnElements = document.querySelectorAll(
  ".product-item-actions button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const response = await fetch("/admin/products/" + productId, {
    method: "DELETE",
  });
  if (!response.ok) {
    alert("something went wrong");
    return;
  }
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteBtnElement of deleteBtnElements) {
  deleteBtnElement.addEventListener("click", deleteProduct);
}
