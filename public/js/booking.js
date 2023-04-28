import axios from "axios";
import { showAlert } from "./alerts";
export const booking = async (
  name,
  email,
  Number,
  address,
  totalAmount,
  foodname,
  payment = "paid"
) => {
  // alert(name, email, Number, address, totalAmount);

  // const PymentSubmit = document.getElementById("PymentSubmit");
  // if (PymentSubmit) {
  //   PymentSubmit.addEventListener("submit", async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/order",
      data: {
        email,
        name,
        Number,
        address,
        totalAmount,
        foodname,
        payment,
      },
    });

    console.log(
      "🚀 ~ file: booking.js:30 ~ //PymentSubmit.addEventListener ~ res:",
      res
    );
    if (res.data.status === "success") {
      showAlert("success", "order in successfully");
    }
  } catch (error) {
    console.error(error);
  }

  // });
  // }
};
