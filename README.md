
# Disease Symptom Checker

The Disease Symptom Checker is a web application designed to help users identify possible diseases based on the symptoms they provide. By entering symptoms into the application, users can receive a list of matching diseases, along with information such as the number of matching symptoms, severity, and a description of the disease.


## Features
- Symptom Input: Users can input multiple symptoms separated by commas.
- Disease Matching: The system matches the entered symptoms with diseases in a CSV     database.
- Severity Levels: Diseases are categorized based on severity (Low, Moderate, High).
- Result Display: Results include the disease name, matching symptoms, match percentage, severity, and a brief description.
- Bootstrap Integration: Uses Bootstrap for a modern, responsive UI.
- Node.js Backend: The backend is built using Node.js and handles CSV parsing and disease matching logic.
## Technologies Used
- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Backend**: Node.js, Express.js
- **CSV Parsing**: csv-parser library in Node.js to read disease data
- **Cross-Origin Requests**: cors for handling cross-origin requests in the backend
- **Data Storage**: Disease data is stored in a CSV file
## Setup Instructions
1. Clone the repository:

   ```git clone https://github.com/ishivammishra/disease-symptom-checker.git```

2. Navigate to the project directory:

    ```cd disease-symptom-checker```

3. Install backend dependencies:

   ```npm install```

4. Run the backend server:

   ```node index.js```


 The backend will run on ```http://localhost:3000```.

5. Open the ```index.html``` file in your browser to use the frontend. Enter symptoms to check for matching diseases.
## How It Works
1. User Input: The user enters symptoms separated by commas.

2. Backend Processing: The backend matches the symptoms against diseases stored in the CSV file

3. Disease Matching: Diseases are ranked based on the number of matching symptoms and the match percentage is calculated.

4. Results Display: The frontend displays the matching diseases along with their severity and description.
