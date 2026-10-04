import $ from "jquery";

//blur-scrollbar
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 50) {
    $("#main-header")
      .removeClass("bg-unique-gray")
      .addClass("bg-zinc-900/70 backdrop-blur-xl");
  } else {
    $("#main-header")
      .removeClass("bg-zinc-900/70 backdrop-blur-xl")
      .addClass("bg-unique-gray");
  }
});

// back-to-top-btn
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("hidden");
      backToTopBtn.classList.add("flex");
    } else {
      backToTopBtn.classList.add("hidden");
      backToTopBtn.classList.remove("flex");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// mobile menu
$(document).ready(function () {
  function openMenu() {
    $("#mobile-menu")
      .removeClass("hidden translate-x-full")
      .addClass("translate-x-0");

    $("#overlay").removeClass("hidden");
  }

  function closeMenu() {
    $("#mobile-menu").removeClass("translate-x-0").addClass("translate-x-full");

    $("#overlay").addClass("hidden");

    setTimeout(() => {
      $("#mobile-menu").addClass("hidden");
    }, 300);
  }

  $("#menu-btn").on("click", openMenu);
  $("#close-btn").on("click", closeMenu);
  $("#overlay").on("click", closeMenu);

  $("#mobile-menu a").on("click", function () {
    closeMenu();
  });
});

// password toggle
function togglePassword(id) {
  const el = document.getElementById(id);
  el.type = el.type === "password" ? "text" : "password";
}
window.togglePassword = togglePassword;

// border validation
function setBorder(id, ok) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove("border-red-500", "border-green-500");

  if (ok === true) el.classList.add("border-green-500");
  if (ok === false) el.classList.add("border-red-500");
}

// validation
function validateUsername() {
  const v = $("#username").val().trim();
  if (!v) return;
  setBorder("usernameBox", v.length >= 3);
}

function validateEmail() {
  const v = $("#email").val().trim();
  if (!v) return;
  setBorder("emailBox", v.includes("@"));
}

function validatePassword() {
  const v = $("#password").val();
  if (!v) return;
  setBorder("passwordBox", v.length >= 6);
}

function validateConfirmPassword() {
  const p = $("#password").val();
  const c = $("#confirmPassword").val();
  if (!c) return;
  setBorder("confirmPasswordBox", p === c);
}

// toast
function showToast(message, type = "success") {
  const $toast = $("<div></div>").text(message);

  const backgroundColor = type === "success" ? "green" : "red";

  $toast.css({
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 16px",
    borderRadius: "10px",
    color: "#fff",
    zIndex: 9999,
    background: backgroundColor,
  });

  $("body").append($toast);

  setTimeout(() => {
    $toast.remove();
  }, 2000);
}

//  register user
function registerUser(event) {
  event.preventDefault();

  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  const isValid =
    username.length >= 3 &&
    email.includes("@") &&
    password.length >= 6 &&
    password === confirmPassword;

  if (!isValid) {
    showToast("Please fill out the form correctly", "error");
    return;
  }

  const user = {
    username,
    email,
    password,
  };

  $.ajax({
    url: "http://localhost:3000/users",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),

    success: function () {
      showToast("Account created successfully", "success");

      setTimeout(() => {
        window.location.href = "index.html#marketplace";
      }, 2000);
    },

    error: function (err) {
      console.log(err);
      showToast("Server error. Please try again later", "error");
    },
  });
}

//export to window
window.registerUser = registerUser;
window.validateUsername = validateUsername;
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.validateConfirmPassword = validateConfirmPassword;
