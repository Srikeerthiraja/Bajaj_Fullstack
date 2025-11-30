export default function handler(req, res) {
  if (req.method === "POST") {
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
        if (!isNaN(item)) {
          let num = Number(item);
          sum += num;
          num % 2 === 0 ? even.push(item) : odd.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          special.push(item);
        }
      });

      // concatenation reverse + alternate caps
      let concatString = "";
      alphabets.reverse().forEach((ch, i) => {
        concatString += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
      });

      return res.status(200).json({
        is_success: true,
        user_id: "keerthi_raja_28112025",
        email: "srikeera@gmail.com",
        roll_number: "22BCE1478",
        odd_numbers: odd,
        even_numbers: even,
        alphabets,
        special_characters: special,
        sum: sum.toString(),
        concat_string: concatString
      });

    } catch (error) {
      return res.status(500).json({ is_success: false, message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
