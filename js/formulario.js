

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-contacto");
  const nombreInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const mensajeTextarea = document.getElementById("mensaje");

  function showErrorMessage(input, errorMessage) {
    const errorElement = document.getElementById(input.id + "-error");
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
    setTimeout(function () {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }, 4000);
  }

  function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".alerta-contacto");
    errorElements.forEach(function (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    });
  }

  nombreInput.addEventListener("blur", function () {
    const nameValue = nombreInput.value.trim();
    const isValidName = /^[A-Za-z\s]+$/.test(nameValue);
  
    if (nameValue === "") {
      showErrorMessage(nombreInput, "Campo nombre obligatorio");
    } else if (!isValidName) {
      showErrorMessage(nombreInput, "Ingresa un nombre válido");
    }
  });
  

  emailInput.addEventListener("blur", function () {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showErrorMessage(emailInput, "Correo electrónico no válido");
    }
  });

  telefonoInput.addEventListener("blur", function () {
    if (isNaN(telefonoInput.value) || telefonoInput.value.length !== 10) {
      showErrorMessage(telefonoInput, "Número de teléfono no válido");
    }
  });

  mensajeTextarea.addEventListener("blur", function () {
    if (mensajeTextarea.value.trim() === "") {
      showErrorMessage(mensajeTextarea, "Campo mensaje obligatorio");
    }
  });

  form.addEventListener("submit", function (e) {
    clearErrorMessages();

    if (
      nombreInput.value.trim() === "" ||
      !isValidEmail(emailInput.value.trim()) ||
      isNaN(telefonoInput.value) ||
      telefonoInput.value.length !== 10 ||
      mensajeTextarea.value.trim() === ""
    ) {
      e.preventDefault();
      showErrorMessage(
        form,
        "Por favor, complete todos los campos correctamente."
      );
    } else {
      nombreInput.value = "";
      emailInput.value = "";
      telefonoInput.value = "";
      mensajeTextarea.value = "";
      alert("Formulario enviado con éxito");
    }
  });

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
});



