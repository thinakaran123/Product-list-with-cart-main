let totalvalueofcart = 0;
let totalprice = 0;
let cart = {};

// Add hidden class initially
document.getElementById("totalsec").classList.add("hidden");

// Handle button clicks
document.querySelectorAll(".fstbtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.previousElementSibling.style.borderWidth = "2px";
    btn.previousElementSibling.style.borderColor = "hsl(14, 86%, 42%)";

    document.getElementById("totalsec").classList.remove("hidden");
    let productName = this.getAttribute("data-item-name");
    let itemprice = parseFloat(this.getAttribute("data-item-price"));
    let imgsr = this.getAttribute("data-item-img");

    totalvalueofcart++;
    totalprice += itemprice;
    document.getElementById("totalprice").textContent = totalprice.toFixed(2);

    btn.classList.add("hidden");
    btn.nextElementSibling.classList.remove("hidden");
    btn.nextElementSibling.classList.add("flex");

    let addbutton = btn.parentElement.querySelector(".addimg");
    let subbutton = btn.parentElement.querySelector(".minusimg");

    if (!cart[productName]) {
      cart[productName] = { quantity: 1, price: itemprice, imgs: imgsr };
    }

    displayincart();
    displayinfinalcart();

    addbutton.addEventListener("click", function () {
      cart[productName].quantity += 1;
      totalvalueofcart++;
      totalprice += itemprice;
      btn.nextElementSibling.children[1].textContent =
        parseInt(btn.nextElementSibling.children[1].textContent, 10) + 1;
      document.getElementById("total").textContent = totalvalueofcart;
      document.getElementById("totalprice").textContent = totalprice.toFixed(2);

      displayincart();
      displayinfinalcart();
    });

    subbutton.addEventListener("click", function () {
      if (cart[productName].quantity > 1) {
        cart[productName].quantity -= 1;
        totalvalueofcart--;
        totalprice -= itemprice;
        btn.nextElementSibling.children[1].textContent =
          parseInt(btn.nextElementSibling.children[1].textContent, 10) - 1;

        document.getElementById("total").textContent = totalvalueofcart;
        document.getElementById("totalprice").textContent =
          totalprice.toFixed(2);

        displayincart();
        displayinfinalcart();
      }
    });
  });
});

// Display cart items
function displayincart() {
  const cartsection = document.getElementById("cart");
  cartsection.innerHTML = "";

  for (let [productName, { quantity, price }] of Object.entries(cart)) {
    const outerdivelement = document.createElement("div");
    const divelement = document.createElement("div");
    const divelementone = document.createElement("div");
    const pelementname = document.createElement("p");
    const pelementquantity = document.createElement("p");
    const pelementprice = document.createElement("p");
    const pelementtotalprice = document.createElement("p");
    const ximg = document.createElement("img");
    const hrelement = document.createElement("hr");

    pelementname.textContent = productName;
    pelementquantity.textContent = quantity + "x";
    pelementquantity.style.color = "hsl(14, 86%, 42%)";
    pelementquantity.style.fontWeight = "600";

    pelementprice.textContent = "@" + price;
    pelementprice.style.color = "hsl(7, 20%, 60%)";

    pelementtotalprice.textContent = "$" + (price * quantity).toFixed(2);
    pelementtotalprice.style.fontWeight = "600";
    pelementtotalprice.style.color = "hsl(12, 20%, 44%)";

    ximg.src = "../assets/images/icon-remove-item.svg";
    ximg.style.border = "solid 1px hsl(12, 20%, 44%)";
    ximg.style.padding = "3px";
    ximg.style.borderRadius = "50%";

    divelementone.appendChild(pelementquantity);
    divelementone.appendChild(pelementprice);
    divelementone.appendChild(pelementtotalprice);
    divelement.appendChild(divelementone);
    divelement.appendChild(ximg);
    divelement.style.display = "flex";
    divelementone.style.display = "flex";
    divelementone.style.gap = "15px";
    divelementone.style.justifyContent = "space-between";
    outerdivelement.appendChild(pelementname);

    outerdivelement.appendChild(divelement);

    outerdivelement.appendChild(hrelement);
    cartsection.appendChild(outerdivelement);

    ximg.onclick = function () {
      let currentitem = pelementname.textContent;
      if (cart[currentitem]) {
        totalvalueofcart -= cart[currentitem].quantity;
        totalprice -= cart[currentitem].price * cart[currentitem].quantity;
        delete cart[currentitem];

        displayincart();
        displayinfinalcart();

        let matchingButton = Array.from(
          document.querySelectorAll(".fstbtn")
        ).find(
          (button) => button.getAttribute("data-item-name") === currentitem
        );
        if (matchingButton) {
          matchingButton.classList.remove("hidden");
          matchingButton.nextElementSibling.classList.add("hidden");
        }
      }
    };
  }
  document.getElementById("total").textContent = totalvalueofcart;
}

// Display items in final cart
function displayinfinalcart() {
  const cartsection = document.getElementById("finalcart");
  cartsection.innerHTML = ""; // Clear the final cart section

  if (Object.keys(cart).length === 0) {
    console.log("Cart is empty. Nothing to display in final cart.");
    return;
  }

  for (let [productName, { quantity, price, imgs }] of Object.entries(cart)) {
    if (quantity > 0) {
      const outermostdivelement = document.createElement("div");
      const imgelement = document.createElement("img");
      const outerdivelement = document.createElement("div");
      const pelementname = document.createElement("p");
      const divelementone = document.createElement("div");
      const pelementquantity = document.createElement("p");
      const pelementprice = document.createElement("p");
      const pelementtotalprice = document.createElement("p");
      const hrelement = document.createElement("hr");

      pelementname.textContent = productName;
      pelementquantity.textContent = quantity + "x";
      imgelement.src = imgs;

      imgelement.style.width = "40px";
      imgelement.style.height = "40px";
      pelementquantity.style.color = "hsl(14, 86%, 42%)";
      pelementquantity.style.fontWeight = "600";
      pelementprice.style.color = "hsl(7, 20%, 60%)";
      pelementtotalprice.style.fontWeight = "600";
      pelementtotalprice.style.color = "hsl(12, 20%, 44%)";
      outermostdivelement.style.display = "flex";
      outermostdivelement.style.gap = "10px";
      outermostdivelement.style.marginTop = "3px";
      outermostdivelement.style.marginBottom = "3px";
      divelementone.style.display = "flex";
      divelementone.style.gap = "15px";
      divelementone.style.justifyContent = "space-between";
      hrelement.style.marginBottom = "8px";

      pelementprice.textContent = "@" + price;
      pelementtotalprice.textContent = "$" + (price * quantity).toFixed(2);

      outermostdivelement.appendChild(imgelement);
      outermostdivelement.appendChild(outerdivelement);
      outerdivelement.appendChild(pelementname);
      outerdivelement.appendChild(divelementone);
      divelementone.appendChild(pelementquantity);
      divelementone.appendChild(pelementprice);
      divelementone.appendChild(pelementtotalprice);
      outermostdivelement.appendChild(hrelement);

      cartsection.appendChild(outermostdivelement);

      console.log("Displaying:", {
        productName,
        quantity,
        price,
        imgs,
      });
    }
  }

  document.getElementById("total").textContent = totalvalueofcart;
  document.getElementById("totalprice").textContent = totalprice.toFixed(2);
}

document.getElementById("confirmorder").addEventListener("click", () => {
  if (totalprice > 0) {
    document.getElementById("secoffinalcart").classList.remove("hidden");
  }
});

document.getElementById("startnew").addEventListener("click", () => {
  window.location.reload();
});
