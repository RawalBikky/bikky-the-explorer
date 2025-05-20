document.addEventListener("DOMContentLoaded", () => {
  // Handle Newsletter Subscription
  const subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector("input[type='email']");
      const email = emailInput.value.trim();

      if (email) {
        alert(`Thanks for subscribing to Rider's Journal, ${email}!`);
        emailInput.value = "";

        // Optional: store in localStorage for demo
        let subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // Handle Query Submission
  document.getElementById("query-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const queryInput = document.getElementById("query-input");
    const queryText = queryInput.value.trim();
    const userName = prompt("Enter your name:");

    if (queryText && userName) {
      const queryDiv = document.createElement("div");
      queryDiv.classList.add("query");
      queryDiv.innerHTML = `
        <h4>Query: ${queryText}</h4>
        <p><strong>Posted by:</strong> ${userName}</p>
        <div class="response-section">
          <input type="text" placeholder="Write a response..." class="response-input" />
          <button class="submit-response-btn">Submit Response</button>
        </div>
        <div class="responses"></div>
        <button class="delete-query-btn">🗑️ Delete</button>
      `;

      document.getElementById("queries-list").appendChild(queryDiv);
      queryInput.value = "";
    }
  });

  // Event Delegation for responses and delete buttons
  document.getElementById("queries-list").addEventListener("click", function (e) {
    // Submit response
    if (e.target.classList.contains("submit-response-btn")) {
      const responseInput = e.target.previousElementSibling;
      const responseText = responseInput.value.trim();
      if (responseText) {
        const responsesDiv = e.target.closest(".query").querySelector(".responses");
        const responseEl = document.createElement("p");
        responseEl.textContent = `🗨️ ${responseText}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-response-btn");
        responseEl.appendChild(deleteBtn);

        responsesDiv.appendChild(responseEl);
        responseInput.value = "";
      }
    }

    // Delete query
    if (e.target.classList.contains("delete-query-btn")) {
      const confirmDelete = confirm("Are you sure you want to delete this query?");
      if (confirmDelete) {
        e.target.closest(".query").remove();
      }
    }

    // Delete individual response
    if (e.target.classList.contains("delete-response-btn")) {
      const confirmDelete = confirm("Delete this response?");
      if (confirmDelete) {
        e.target.parentElement.remove();
      }
    }
  });

  // Toggle reply section for public comments
  const replyButtons = document.querySelectorAll(".reply-btn");
  replyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const replySection = button.nextElementSibling;
      replySection.style.display =
        replySection.style.display === "none" || !replySection.style.display
          ? "block"
          : "none";
    });
  });

  // Submit public replies
  const submitReplyButtons = document.querySelectorAll(".submit-reply-btn");
  submitReplyButtons.forEach((submitBtn) => {
    submitBtn.addEventListener("click", () => {
      const replyInput = submitBtn.previousElementSibling;
      const replyOutput = submitBtn.nextElementSibling;

      if (replyInput.value.trim() !== "") {
        replyOutput.innerHTML = `<p>🗨️ ${replyInput.value}</p>`;
        replyInput.value = "";
      }
    });
  });
});
