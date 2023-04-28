import axios from "axios";
import { showAlert } from "./alerts";
const grid = document.getElementById("paginated-list");
const pagination = (valuestart, valueEnd, data1) => {
  console.log("🚀 ~ file: Food.js:40 ~ pagination ~ valuestart:", data1);
  console.log("🚀 ~ file: Food.js:40 ~ pagination ~ valuestart:", valuestart);

  for (let i = valuestart; i <= valueEnd; i++) {
    if (data1[i].stock === "out of stock") {
      var classname = "outofstock";
    } else {
      var classname = "";
    }
    const html = `
<div class="box">
<a href="#" class="fas fa-heart"></a>
<div class="image">
  <img src="image/${data1[i].image}" alt="">
</div>
<div class="content">
  <h3>${data1[i].name}</h3>
  <div class="stars">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
      <span> (${data1[i].rating}) </span>
  </div>
  <div class="price">$${data1[i].price} <span>$${data1[i].previous_Price}</span></div>

  <a href="#" class="btn ${classname}"> ${data1[i].stock}</a>
</div>
</div>

`;
    grid.insertAdjacentHTML("beforeend", html);
  }
};

// export const Food = async (value) => {
//   console.log("🚀 ~ file: Food.js:5 ~ Food ~ value:", String(value));

//   try {
//     const res = await axios({
//       method: "GET",
//       url: "/api/v1/Food",
//     });
//     let data = res.data.data.data;
//     if (value === "1") {
//       grid.textContent = "";
//       pagination(0, 4, data);
//     } else if (value === "2") {
//       grid.textContent = "";
//       pagination(1, 5, data);
//     }

//     //  else if (value === "3") {
//     //   pagination(10, 14);
//     // } else if (value === "4") {
//     //   pagination(15, 19);
//     // } else if (value === "5") {
//     //   pagination(20, 24);
//     // }
//     //     if (value === "1") {
//     //       console.log("hellopagi1");
//     //       // pagination(0, 4);
//     //       for (let i = valuestart; i <= valueEnd; i++) {
//     //         if (data1[i].stock === "out of stock") {
//     //           var classname = "outofstock";
//     //         } else {
//     //           var classname = "";
//     //         }
//     //         const html = `
//     //   <div class="box">
//     //   <a href="#" class="fas fa-heart"></a>
//     //   <div class="image">
//     //       <img src="image/${data1[i].image}" alt="">
//     //   </div>
//     //   <div class="content">
//     //       <h3>${data1[i].name}</h3>
//     //       <div class="stars">
//     //           <i class="fas fa-star"></i>
//     //           <i class="fas fa-star"></i>
//     //           <i class="fas fa-star"></i>
//     //           <i class="fas fa-star"></i>
//     //           <i class="fas fa-star-half-alt"></i>
//     //           <span> (${data1[i].rating}) </span>
//     //       </div>
//     //       <div class="price">$${data1[i].price} <span>$${data1[i].previous_Price}</span></div>

//     //       <a href="#" class="btn ${classname}"> ${data1[i].stock}</a>
//     //   </div>
//     // </div>

//     //   `;
//     //         grid.insertAdjacentHTML("beforeend", html);
//     //       }
//     //     } else if (value === "2") {
//     //       console.log("hellopagi2");
//     //       pagination(5, 9);
//     //     } else if (value === "3") {
//     //       pagination(10, 14);
//     //     } else if (value === "4") {
//     //       pagination(15, 19);
//     //     } else if (value === "5") {
//     //       pagination(20, 24);
//     //     }

//     // if (res.data.status === "success") {
//     //   // alert("successfully");
//     //   console.log(data);
//     //   // window.setTimeout(() => {
//     //   //   location.assign("");
//     //   // }, 1000);
//     // }
//   } catch (err) {
//     showAlert("error", err.response.data.message);
//   }
// };

// // const html = (data) => {
// //   console.log(data.rating);
// //   return `
// //   <div class="box">
// //   <a href="#" class="fas fa-heart"></a>
// //   <div class="image">
// //       <img src="image/food-1.png" alt="">
// //   </div>
// //   <div class="content">
// //       <h3></h3>
// //       <div class="stars">
// //           <i class="fas fa-star"></i>
// //           <i class="fas fa-star"></i>
// //           <i class="fas fa-star"></i>
// //           <i class="fas fa-star"></i>
// //           <i class="fas fa-star-half-alt"></i>
// //           <span> () </span>
// //       </div>
// //       <div class="price">$ <span>$00</span></div>
// //       <a href="#" class="btn"> </a>
// //   </div>
// // </div>

// //   `;
// // };

export const Food = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/Food",
    });
    let data = res.data.data.data;
    pagination(1, data.length, data);

    // pagination(0, data.length-1, data);
    // pagination(1, data.length, data);
    // pagination(1, data.length, data);
    // pagination(1, data.length, data);
    // pagination(1, data.length, data);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
