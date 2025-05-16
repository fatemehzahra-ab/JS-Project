import "./style.css";
import { login } from "../apis/auth";

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
const username = document.getElementById("username");
const submitBtn = document.getElementById("submitBtn");

const systemErr = document.getElementById("system-err");
const usernameErr = document.getElementById("username-err");
const passwordErr = document.getElementById("password-err");

const showErrors = (msg) => {
  if (msg.includes("username")) {
    usernameErr.innerText = msg;
    usernameErr.classList.remove("hidden");
  } else if (msg.includes("password")) {
    passwordErr.innerText = msg;
    passwordErr.classList.remove("hidden");
  } else {
    systemErr.innerText = msg;
    systemErr.classList.remove("hidden");
  }
};

const clearError = () => {
  systemErr.classList.add("hidden");
  usernameErr.classList.add("hidden");
  passwordErr.classList.add("hidden");
};

togglePassword.addEventListener("click", () => {
  const type = password.getAttribute("type");
  password.setAttribute("type", type === "password" ? "text" : "password");
});

function checkInputs() {
  if (username.value.trim() !== "" && password.value.trim() !== "") {
    submitBtn.classList.remove("opacity-65");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add("opacity-65");
    submitBtn.disabled = true;
  }
}

username.addEventListener("input", checkInputs);
password.addEventListener("input", checkInputs);

checkInputs();

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();
  const usernameValue = username.value;
  const passwordValue = password.value;
  const data = { username: usernameValue, password: passwordValue };
  try {
    const resBody = await login(data);

    localStorage.setItem("token", resBody.token);
    location.href = "/home";
  } catch (error) {
    const msg = error.response?.data?.message;
    if (Array.isArray(msg)) {
      msg.forEach(showErrors);
      return;
    }
    if (typeof msg === "string") {
      showErrors(msg);
      return;
    }
    console.log(error);
    showErrors("Something went wrong");
  }
});
