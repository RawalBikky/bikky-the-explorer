// Function to submit a query
document.getElementById('query-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const queryInput = document.getElementById("query-input");
  const queryText = queryInput.value.trim();
  const userName = prompt("Enter your name:");

  if (queryText && userName) {
    // Create a new query div element
    const queryDiv = document.createElement('div');
    queryDiv.classList.add('query');
    queryDiv.innerHTML = `
      <h4>Query: ${queryText}</h4>
      <p><strong>Posted by:</strong> ${userName}</p>
      <div class="response-section">
        <input type="text" placeholder="Write a response..." />
        <button onclick="submitResponse(this)">Submit Response</button>
      </div>
      <div class="responses"></div>
    `;

    // Append the new query to the queries list
    const queriesList = document.getElementById('queries-list');
    queriesList.appendChild(queryDiv);

    // Clear the query input
    queryInput.value = '';
  }
});

// Function to submit a response to a query
function submitResponse(button) {
  const responseInput = button.previousElementSibling;
  const responseText = responseInput.value.trim();

  if (responseText) {
    const responsesDiv = button.closest('.query').querySelector('.responses');
    const responseParagraph = document.createElement('p');
    responseParagraph.textContent = responseText;
    responsesDiv.appendChild(responseParagraph);
    responseInput.value = ''; // Clear the response input
  }
}
