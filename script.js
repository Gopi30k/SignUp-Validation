const uname = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const cpassword = document.querySelector("#cpassword");
const submit = document.querySelector("#signup");

/*
 * Check count of provided field with minimum count of it
 */
function chck_count_chars(inp, element, min_length) {
  const pElement = element.parentElement.classList;
  if (inp.length >= min_length) {
    pElement.remove("info", "error", "invalid");
    pElement.add("valid");
  } else {
    pElement.remove("valid", "invalid");
    inp.length !== 0
      ? showErrorInfoMsg(
          element,
          `${element.getAttribute(
            "placeholder"
          )} must be minimum of ${min_length} characters`,
          "info"
        )
      : pElement.remove("info", "error");
  }
}

/*
 * Email Regex Validation
 */

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/*
 * Display Info/Error message below form fields
 */
function showErrorInfoMsg(element, msg, state) {
  element.parentElement.classList.add(state);
  const small_txt = element.parentElement.querySelector("small");
  small_txt.innerText = msg;
}

/*
 * Username validation of minimum 6 characters
 */
uname.addEventListener("keyup", function () {
  chck_count_chars(this.value, this, 6);
});

/*
 * password validation of minimum 8 characters
 */
password.addEventListener("keyup", function () {
  chck_count_chars(this.value, this, 8);
});

/*
 * Email validation
 */
email.addEventListener("keyup", function () {
  const pEle = this.parentElement.classList;
  if (!validateEmail(this.value)) {
    pEle.remove("valid", "invalid");
    this.value.length !== 0
      ? showErrorInfoMsg(this, "Please enter a Valid Email Id", "info")
      : pEle.remove("info", "error");
  } else {
    pEle.remove("info", "error");
    pEle.add("valid");
  }
});

/*
 * Password matching validation
 */
cpassword.addEventListener("keyup", function () {
  const pwd = password.value;
  const pEle = this.parentElement.classList;
  if (pwd === this.value && pwd !== "") {
    pEle.remove("info", "error");
    pEle.add("valid");
  } else {
    pEle.remove("valid", "invalid");
    this.value.length !== 0
      ? showErrorInfoMsg(this, "Passwords do not match", "info")
      : pEle.remove("info", "error");
  }
});

function submit_validation(element) {
  element.parentElement.classList.remove("info", "error", "valid");
  element.parentElement.classList.add("invalid");
  showErrorInfoMsg(
    element,
    `${element.getAttribute("placeholder")} is invalid`,
    "error"
  );
}

submit.addEventListener("click", function () {
  uname.value.length < 6 ? submit_validation(uname) : "";
  validateEmail(email.value) ? "" : submit_validation(email);
  password.value.length < 8 ? submit_validation(password) : "";
  password.value !== cpassword.value ||
  cpassword.value === "" ||
  password.value === ""
    ? submit_validation(cpassword)
    : "";
  const validator = Array.from(document.querySelectorAll(".form-control"));

  if (
    validator.every((item) => item.classList.value === "form-control valid")
  ) {
    document.querySelector(
      "body"
    ).innerHTML = `<h2><i class="fas fa-check-circle fa-lg" style="color:green"></i>
      Hey ${uname.value} Welcome </h2>`;
  }
});
