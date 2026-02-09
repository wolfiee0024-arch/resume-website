function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // FAIL SECURE: if anything is empty -> deny
  if (!username || !password) {
    alert("Access Denied: Username and Password required.");
    return;
  }

  // Demo accounts (for assignment)
  const accounts = {
    user: { password: "user123", role: "user" },
    admin: { password: "admin123", role: "admin" }
  };

  // FAIL SECURE: if account doesn't exist -> deny
  if (!accounts[username]) {
    alert("Access Denied: Invalid username.");
    return;
  }

  // FAIL SECURE: wrong password -> deny
  if (accounts[username].password !== password) {
    alert("Access Denied: Invalid password.");
    return;
  }

  // Store session (demo)
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", username);
  localStorage.setItem("role", accounts[username].role);

  // Redirect to resume page
  window.location.href = "index.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function requireLogin() {
  const loggedIn = localStorage.getItem("loggedIn");

  // FAIL SECURE: if session missing -> deny
  if (loggedIn !== "true") {
    window.location.href = "login.html";
  }
}

function requireAdmin() {
  requireLogin();

  const role = localStorage.getItem("role");

  // LEAST PRIVILEGE: only admin can access
  if (role !== "admin") {
    alert("Access Denied: Admin privileges required.");
    window.location.href = "index.html";
  }
}
