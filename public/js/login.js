import axios from "axios";
import { showAlert } from "./alerts";
let logoutbtn = document.querySelector(".logoutbtn");
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "logged in successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    logoutbtn.textContent = "Loading...";
    setTimeout(() => {
      logoutbtn.textContent = "successfull";
    }, 1500);
    if ((res.data.status = "success")) {
      // showAlert("success", "logged in successfully");
      // location.reload(true);
      window.setTimeout(() => {
        location.assign("/");
      }, 2500);
    }
  } catch (err) {
    showAlert("error", "Error loging out! Try again");
  }
};
