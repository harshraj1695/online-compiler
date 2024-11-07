const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/run', (req, res) => {
  const { code } = req.body;

  // Write code to a file
  const codeFilePath = path.join(__dirname, 'sandbox', 'code.cpp');
  const outputFilePath = path.join(__dirname, 'sandbox', 'output.txt');
  fs.writeFileSync(codeFilePath, code);

  // Run Docker container to compile and execute code
  exec(`docker run --rm -v ${codeFilePath}:/sandbox/code.cpp -v ${outputFilePath}:/sandbox/output.txt compiler-image bash -c "g++ /sandbox/code.cpp -o /sandbox/code && ./sandbox/code > /sandbox/output.txt 2>&1"`, 
    (error) => {
      // Read output or error from the output file
      let result = fs.readFileSync(outputFilePath, 'utf-8');
      if (error) {
        result += '\nCompilation or Execution Error';
      }
      res.send({ output: result });
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
