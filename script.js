async function checkDiseases() {
  const symptomsInput = document.getElementById("symptoms").value;
  const symptoms = symptomsInput.split(",").map((symptom) => symptom.trim());

  const response = await fetch("http://localhost:3000/search-diseases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });

  const diseases = await response.json();
  displayResults(diseases);
}

function displayResults(diseases) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (diseases.length > 0) {
    diseases.forEach((disease) => {
      let severityBadge = "badge-success"; // Default to green (low severity)
      if (disease.severity.toLowerCase() === "high") {
        severityBadge = "badge-danger"; // Red for high severity
      } else if (disease.severity.toLowerCase() === "moderate") {
        severityBadge = "badge-warning"; // Yellow for moderate severity
      }

      // Build the HTML for each disease card
      const diseaseElement = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${disease.name}</h5>
            <p class="card-text">
              <strong>Matching Symptoms:</strong> ${disease.matchingSymptoms}/${disease.totalSymptoms}
              <br><strong>Match Percentage:</strong> ${disease.matchPercentage}%
              <br><span class="badge ${severityBadge}">${disease.severity}</span>
              <br><strong>Description:</strong> ${disease.description}
            </p>
          </div>
        </div>
      `;

      // Append the disease element to the results
      resultsDiv.innerHTML += diseaseElement;
    });
  } else {
    resultsDiv.innerHTML = "<p>No matching diseases found.</p>";
  }
}
