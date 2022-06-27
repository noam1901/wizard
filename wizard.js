/* eslint-disable */
let currentTab = 0; // Current tab is set to be the first tab (0)
const citySelect = document.querySelector("#city")
const citySpan = document.querySelector("#city_span")
const fullName = document.querySelector("#fullname")
const email = document.querySelector("#email")
const bDay = document.querySelector("#bDay")
const street = document.querySelector("#street")
const number = document.querySelector("#number")


showTab(currentTab); // Display the current tab
const regexName = new RegExp("^[A-z]{2,}( [A-z]{2,})+([A-z]|[ ]?)$")

const loadData = () => {
  fullName.value = localStorage.getItem("name") || ""
  email.value = localStorage.getItem("email") || ""
  bDay.value = localStorage.getItem("date") || ""
  street.value = localStorage.getItem("street") || ""
  citySelect.value = localStorage.getItem("city") || ""
  number.value = localStorage.getItem("number") || ""

}
loadData()


function showTab(n) {
  // This function will display the specified tab of the form...
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  localStorage.setItem("currentTab", currentTab)
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  if (citySelect.value === "" && currentTab === 1) {
    citySpan.classList.remove("city")
    valid = false
  }
  for (let i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" || y[i].classList.contains("invalid")) {
      if (y[i].value == "") {
        y[i].classList.add("invalid")
      }
      // and set the current valid status to false
      valid = false;
    }
  }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}



const getCities = async () => {
  const response = await fetch("./cities.json")
  const data = await response.json()
  for (const city of data.cities) {
    const cityOption = document.createElement("option")
    cityOption.value = city
    cityOption.setAttribute("id", city)
    cityOption.innerText = city
    citySelect.append(cityOption)
  }
}
getCities()
const validateCity = (e) => {
  if (e.value === "") {
    citySpan.classList.remove("city")
    localStorage.setItem("city", "")

  } else {
    citySpan.classList.add("city")
    localStorage.setItem("city", e.value)

  }
}

const validateStreet = (e) => {
  const streetRegEx = /^[A-Za-z]+\s?[./]?[A-Za-z]*$/g
  if (!streetRegEx.test(e.value)) {
    e.classList.add("invalid")
    localStorage.setItem("street", "")


  } else {
    e.classList.remove("invalid")
    localStorage.setItem("street", e.value)

  }
}
const validateNumber = (e) => {
  if (Number(e.value) <= 0 || (Math.floor(Number(e.value)) !== Number(e.value)) || Number(e.value) === Infinity) {
    e.classList.add("invalid");
    localStorage.setItem("number", "")

  } else {
    e.classList.remove("invalid")
    localStorage.setItem("number", e.value)

  }
}

function validName(e) {
  if (!regexName.test(e.value)) {
    e.className += " invalid"
    localStorage.setItem("name", "")
  } else {
    e.classList.remove("invalid")
    localStorage.setItem("name", e.value)
  }
}

function validEmail(e) {
  const regexEmail = /^\S+@\S+\.\S+$/
  if (!regexEmail.test(e.value)) {
    e.className += " invalid"
    localStorage.setItem("email", "")
  } else {
    e.classList.remove("invalid")
    localStorage.setItem("email", e.value)

  }
}

function validDate(e) {
  if (e.value != "") {
    const date = e.value.split('-')
    const current = new Date()
    if (current.getFullYear() < date[0] || current.getFullYear() - date[0] < 18 || current.getFullYear() - date[0] == 18 && current.getMonth() < date[1] && current.getDay() < date[2]) {
      e.className += " invalid"
      localStorage.setItem("date", "")
      return
    } else {
      e.classList.remove("invalid")
      localStorage.setItem("date", e.value)
    }
  }
}