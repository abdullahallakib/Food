import { login, logout } from "./login";
import { mysearchFunction } from "./Search";
import { pagination } from "./pagination";
import { booking } from "./booking";
import { bookTour } from "./stripe";

const striplink = document.querySelector(".striplink");

// striplink.addEventListener("click", bookTour);

const orderData = [];
let BookingName;
let BookingNumber;
let BookingAmount;
let BookingAdress;
let BookingEmail;
let BookingDetails;
const loginFrom = document.querySelector(".form--login");
const search = document.getElementById("myInput");
const addToCart = document.getElementById("paginated-list");
const cartContainer = document.getElementById("cartContainer");
let logoutbtn = document.querySelector(".logoutbtn");
console.log("🚀 ~ file: index.js:23 ~ logoutbtn:", logoutbtn);
const subTotalTexconten = document.querySelector(".subtotalamount");
let subTotalPrice = 0;
const procedOrder = document.querySelector(".order-form");
const paymentForm = document.querySelector(".paymentForm");
// const procedOrder = document.getElementById(".procedOrder");

if (logoutbtn) {
  logoutbtn.addEventListener("click", () => {
    logout();
  });
}

if (search) addEventListener("keyup", mysearchFunction);

if (procedOrder) {
  procedOrder.addEventListener("submit", async (e) => {
    e.preventDefault();
    const procedOrderbtn = document.getElementById("procedOrder");
    const wrapper = document.querySelector(".wrapper");
    procedOrderbtn.textContent = "Processing...";

    BookingName = document.getElementById("orderName").value;
    BookingNumber = document.getElementById("BookingNumber").value;
    BookingAmount = document.querySelector(".subtotalamount").textContent;
    BookingAdress = document.getElementById("BookingAdress").value;
    BookingEmail = document.getElementById("BookingEmail").value;
    BookingDetails = document.getElementById("BookingDetails").value;
    // await booking(
    //   BookingName,
    //   BookingEmail,
    //   BookingNumber,
    //   BookingAdress,
    //   +BookingAmount.slice(0, -1),
    //   orderData.join(",").toString()
    // );

    window.setTimeout(async () => {
      // wrapper.classList.remove("pyactive");
      procedOrderbtn.textContent = "proceed to order";
      await bookTour(BookingAmount.slice(0, -1));
      // location.assign("/paymentGateway");
    }, 1000);
  });

  // if (paymentForm) {
  //   paymentForm.addEventListener("submit", async (e) => {
  //     e.preventDefault();
  //     const wrapper = document.querySelector(".wrapper");
  //     await booking(
  //       BookingName,
  //       BookingEmail,
  //       BookingNumber,
  //       BookingAdress,
  //       +BookingAmount.slice(0, -1),
  //       orderData.join(",").toString()
  //     );
  //     wrapper.classList.toggle("pyactive");
  //     BookingName = document.getElementById("orderName").value = "";
  //     BookingNumber = document.getElementById("BookingNumber").value = "";
  //     BookingAdress = document.getElementById("BookingAdress").value = "";
  //     BookingEmail = document.getElementById("BookingEmail").value = "";
  //     BookingDetails = document.getElementById("BookingDetails").value = "";
  //     // alert("hlloe");
  //   });
  // }

  // if (bookBtn) {
  //   bookBtn.
  // procedOrder.addEventListener("submit", (e) => {
  //   e.target.textContent = "processing...";
  //   location.assign("/paymentGateway");
  //   // window.setTimeout(() => {
  //   // }, 3000);
  //   // const { tourId } = e.target.dataset;
  //   // bookTour(tourId);
  // });
}
let count = 0;
if (addToCart) {
  addToCart.addEventListener("click", async (e) => {
    e.preventDefault;

    if (e.target.classList.value === "btn addToCart") {
      const parentNode = e.target.parentNode;
      console.log(
        "🚀 ~ file: index.js:40 ~ addToCart.addEventListener ~ parentNode:",
        parentNode
      );

      let parenTexcon = parentNode.textContent;
      const parenTexcons = parenTexcon.toString().split(".");
      let parentexCon0 = parenTexcons[0].split("$");
      const price = parentexCon0[1];
      const name = parentexCon0[0].slice(0, -2);
      const newprice = Number(price);
      orderData.push(name);
      console.log(
        "🚀 ~ file: index.js:96 ~ addToCart.addEventListener ~ orderData:",
        orderData.join(",").toString()
      );
      subTotalTexconten.textContent = `${(subTotalPrice += newprice)}$`;
      const html = `   <div class="box cartItem">
          <i class="fas fa-times" data-id=${count}"></i>
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
      count++;

      // localprice.push(parenTexcon);
      // localname.push(name);

      document.querySelector(".totalAddCart").textContent = `${count}`;
    } else {
      return;
    }
  });
}

if (cartContainer) {
  cartContainer.addEventListener("click", async (e) => {
    e.preventDefault;
    count--;
    const targetElement = e.target;
    if (targetElement.classList.value === "fas fa-times") {
      var id = targetElement.dataset.id;

      // await localStorage.removeItem(`${id}`);
      const parentNode = targetElement.parentNode;
      console.log(
        "🚀 ~ file: index.js:85 ~ cartContainer.addEventListener ~ parentNode:",
        parentNode.textContent
      );
      const parentNodeTexcontent = String(parentNode.textContent);
      const split = parentNodeTexcontent.split("$");
      const price = Number(split[1]);
      subTotalTexconten.textContent = `${(subTotalPrice -= price)}$`;
      console.log(
        "🚀 ~ file: index.js:91 ~ cartContainer.addEventListener ~ price:",
        price
      );

      parentNode.style.display = "none";
      document.querySelector(".totalAddCart").textContent = `${count}`;
      if (count === 0) {
        document.querySelector(".totalAddCart").textContent = ``;
      }
    } else {
      return;
    }
  });
}
// Food();
// Food();
// pagefun();
// Food();
// Food();
// Food();
// Food();

// const softPagination = document.querySelector(".soft-pagination-items");
// console.log(
//   "🚀 ~ file: index.js:7 ~ softPagination:",
//   softPagination.textContent
// );
// setTimeout(() => {
//   document.querySelector(".clickauto").click();
// }, 1000);
// // let reomveclass = document.querySelectorAll(".reomveclass");
// // console.log(reomveclass);
// let remove;
// let count = 0;
// const arrow = document.querySelectorAll(".arrow1");
// softPagination.addEventListener("click", (e) => {
//   console.log("hello");
//   if (count) {
//     remove.classList = "";
//   }
//   if (count === 5) {
//     count = 0;
//   }
//   // reomveclass.classList.remove = "";
//   // console.log(reomveclass);
//   const elment = e.target;
//   console.log(
//     "🚀 ~ file: index.js:27 ~ softPagination.addEventListener ~ elment:",
//     elment.classList
//   );
//   if (elment.classList.value === "rightArrow") {
//     console.log("hiii");
//     console.log(String(+remove.textContent + 1));
//     Food(String(+remove.textContent + 1));
//     // arrow[count - 1].classList.remove = "active";
//     arrow[count].classList = "active";
//     remove = arrow[count];
//     count++;
//   } else if (elment.nodeName === "LI") {
//     count++;
//     console.log(
//       "🚀 ~ file: index.js:27 ~ softPagination.addEventListener ~ elment:"
//     );

//     remove = elment;
//     elment.classList = "active";

//     Food(elment.textContent);
//   } else {
//     return;
//   }
// });

// if (clickbtn) clickbtn.addEventListener("click", Food);
const SingupFrom = document.querySelector(".form--singup");
if (loginFrom) {
  loginFrom.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}

if (SingupFrom) {
  SingupFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const passwordConform = document.getElementById("passwordConfirm").value;
    singup(email, password, passwordConform, name);
  });
}

let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cart.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

document.querySelector(".home").onmousemove = (e) => {
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;

  document.querySelector(
    ".home .home-parallax-img"
  ).style.transform = `translateX(${y}px) translateY(${x}px)`;
};

document.querySelector(".home").onmouseleave = () => {
  document.querySelector(
    ".home .home-parallax-img"
  ).style.transform = `translateX(0px) translateY(0px)`;
};

let cart = document.querySelector(".shopping-cart-container");

document.querySelector("#cart-btn").onclick = () => {
  cart.classList.toggle("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
};

// // let loginForm = document.querySelector(".login-form-container");

// // document.querySelector("#login-btn").onclick = () => {
// //   loginForm.classList.toggle("active");
// //   searchForm.classList.remove("active");
// //   cart.classList.remove("active");
// //   navbar.classList.remove("active");
// // };

// window.onscroll = () => {
//   navbar.classList.remove("active");
// };

// document.querySelector(".home").onmousemove = (e) => {
//   let x = (window.innerWidth - e.pageX * 2) / 90;
//   let y = (window.innerHeight - e.pageY * 2) / 90;

//   document.querySelector(
//     ".home .home-parallax-img"
//   ).style.transform = `translateX(${y}px) translateY(${x}px)`;
// };

// document.querySelector(".home").onmouseleave = () => {
//   document.querySelector(
//     ".home .home-parallax-img"
//   ).style.transform = `translateX(0px) translateY(0px)`;
// };
// pagination();
// const paginationNumbers = document.getElementById("pagination-numbers");
// console.log("🚀 ~ file: index.js:145 ~ paginationNumbers:", paginationNumbers);
// const paginatedList = document.getElementById("paginated-list");
// console.log("🚀 ~ file: index.js:147 ~ paginatedList:", paginatedList);
// const listItems = paginatedList.querySelectorAll(".box");
// console.log("🚀 ~ file: index.js:149 ~ listItems:", listItems);
// const nextButton = document.getElementById("next-button");
// console.log("🚀 ~ file: index.js:151 ~ nextButton:", nextButton);
// const prevButton = document.getElementById("prev-button");
// console.log("🚀 ~ file: index.js:153 ~ prevButton:", prevButton);

// const paginationLimit = 10;
// const pageCount = Math.ceil(listItems.length / paginationLimit);
// let currentPage = 1;

// const disableButton = (button) => {
//   button.classList.add("disabled");
//   button.setAttribute("disabled", true);
// };

// const enableButton = (button) => {
//   button.classList.remove("disabled");
//   button.removeAttribute("disabled");
// };

// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };

// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);

//   paginationNumbers.appendChild(pageNumber);
// };

// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

// handleActivePageNumber();
// handlePageButtonsStatus();

//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };
// localStorageLoading();
// pagination();
if (pagination) {
  pagination();
}
