function sendData() {
  const namee   = document.getElementById("inputName").value;
  const email   = document.getElementById("inputEmail4").value;
  const pass    = document.getElementById("inputPassword4").value;
  const address = document.getElementById("inputAddress").value;
  const city    = document.getElementById("inputCity").value;
  const color   = document.getElementById("color").value;

  const gender =
    document.getElementById("male").checked ? "Male" :
    document.getElementById("female").checked ? "Female" : "";

  localStorage.setItem("formData", JSON.stringify({
    namee, email, pass, address, city, color, gender
  }));

  window.location.href = "registered.html";
}
