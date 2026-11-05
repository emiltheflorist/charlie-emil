
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar-placeholder");

  if (!navbar) return;

  fetch("/charlie-emil/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Could not load navigation");
      }
      return response.text();
    })
    .then(html => {
      navbar.innerHTML = html;
    })
    .catch(error => {
      console.error("Navigation error:", error);
    });
});

