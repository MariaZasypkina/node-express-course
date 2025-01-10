let token = null;

// Handle login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/v1/logon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();

    if (response.ok) {
      token = data.token;
      document.getElementById("response").textContent =
        "Login successful! Token saved.";
    } else {
      document.getElementById("response").textContent =
        data.message || "Login failed.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("response").textContent =
      "An error occurred during login.";
  }
});

// Handle getting the hello message
document.getElementById("get-message").addEventListener("click", async () => {
  if (!token) {
    document.getElementById("response").textContent = "Please log in first.";
    return;
  }

  try {
    const response = await fetch("/api/v1/hello", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (response.ok) {
      document.getElementById("response").textContent = data.message;
    } else {
      document.getElementById("response").textContent =
        data.message || "Failed to get message.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("response").textContent =
      "An error occurred while fetching the message.";
  }
});
