const express = require("express");
const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    // Change details 
    const user_id = "jayasri_t_07022005";  // full_name_ddmmyyyy
    const email = "jayasri.t2022@vitstudent.ac.in";    // your email
    const roll_number = "22BIT0678";      // your roll number

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        // Number
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Alphabet
        alphabets.push(item.toUpperCase());
      } else {
        // Special char
        special_characters.push(item);
      }
    });

    // Concat string: reverse + alternating caps
    const concat_string = alphabets
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// Run server locally
app.listen(3000, () => console.log("Server running on port 3000"));
