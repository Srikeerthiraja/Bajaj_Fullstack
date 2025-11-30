const express = require("express");
const app = express();

app.use(express.json());   // to parse json body

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    let even = [];
    let odd = [];
    let alphabets = [];
    let special = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {              // if numeric
        let num = Number(item);
        sum += num;
        num % 2 === 0 ? even.push(item) : odd.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {   // if alphabet
        alphabets.push(item.toUpperCase());
      } else {
        special.push(item);            // special characters
      }
    });

    // alphabetical concatenation (reverse + alternate caps)
    let concatString = "";
    let reverseAlpha = alphabets.reverse(); 
    reverseAlpha.forEach((ch, index) => {
      concatString += index % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    return res.status(200).json({
      is_success: true,
      user_id: "keerthi_raja_28112025",  // format: full_name_ddmmyyyy
      email: "srikeera@gmail.com",
      roll_number: "22BCE1478",
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatString
    });

  } catch (err) {
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// Root test route
app.get("/", (req, res) => {
  res.send("BFHL API running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
