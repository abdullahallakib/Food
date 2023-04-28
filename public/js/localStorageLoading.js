export const localStorageLoading = () => {
  if (localStorage.length === 1) {
    localStorage.clear();
    return;
  }
  const subTotalTexconten = document.querySelector(".subtotalamount");
  console.log(
    "🚀 ~ file: localStorageLoading.js:7 ~ localStorageLoading ~ subTotalTexconten:",
    subTotalTexconten
  );
  let subTotalPrice = 0;
  for (var i = 1; i <= localStorage.length; i++) {
    document.querySelector(
      ".totalAddCart"
    ).textContent = `${localStorage.length}`;
    console.log(localStorage.getItem(i));
    const item = localStorage.getItem(i);
    const parenTexcon = String(item).split(".");
    let parentexCon0 = parenTexcon[0].split("$");
    const price = parentexCon0[1];
    if (price === undefined) {
      localStorage.clear();
      continue;
    }
    const newprice = Number(price);
    subTotalTexconten.textContent = `${(subTotalPrice += newprice)}$`;
    // console.log("subtoo...", (subTotalPrice += newprice));

    console.log("🚀 ~ file: index.js:27 ~ price:", price);
    const name = parenTexcon[0].slice(0, -8);
    console.log("🚀 ~ file: index.js:29 ~ name:", name);

    const html = `   <div class="box cartItem">
      <i class="fas fa-times"  data-id=${i}></i>
      <img src="image/menu-1.png" alt="">
      <div class="content">
          <h3>${name}</h3>
          <span> quantity : </span>
          <input type="number" name="" value="1" id="">
          <br>
          <span> price : </span>
          <span class="price"> $${price}.00 </span>
      </div>
    </div>`;

    cartContainer.insertAdjacentHTML("beforeend", html);
  }
};
