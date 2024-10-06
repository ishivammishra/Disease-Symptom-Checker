const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Load the CSV data
let diseaseDatabase = [];

// Function to load CSV data asynchronously
const loadCsvData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream("disease_data.csv")
      .pipe(csv())
      .on("data", (row) => {
        const symptomsArray = row.symptoms
          .split(",")
          .map((symptom) => symptom.trim().toLowerCase());
        diseaseDatabase.push({
          name: row.disease,
          symptoms: symptomsArray,
          severity: row.severity,
          description: row.description,
        });
      })
      .on("end", () => resolve())
      .on("error", (error) => reject(error));
  });
};

// Function to calculate severity based on the number of matching symptoms
const findDiseasesBySymptoms = (inputSymptoms) => {
  const results = diseaseDatabase.map((disease) => {
    const matchingSymptoms = disease.symptoms.filter((symptom) =>
      inputSymptoms.includes(symptom)
    );
    const matchPercentage =
      (matchingSymptoms.length / disease.symptoms.length) * 100;

    return {
      name: disease.name,
      matchingSymptoms: matchingSymptoms.length,
      totalSymptoms: disease.symptoms.length,
      severity: disease.severity,
      matchPercentage: matchPercentage.toFixed(2),
      description: disease.description,
    };
  });

  return results
    .filter((result) => result.matchingSymptoms > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
};

// Load CSV data and start server
loadCsvData()
  .then(() => {
    // Route to handle symptom input and return diseases
    app.post("/search-diseases", (req, res) => {
      const { symptoms } = req.body;
      console.log("Received Symptoms:", symptoms); 
      const matchingDiseases = findDiseasesBySymptoms(
        symptoms.map((s) => s.toLowerCase())
      );
      res.json(matchingDiseases);
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error loading CSV data:", error);
  });
