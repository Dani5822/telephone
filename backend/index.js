import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "telephoneDatabase",
  })
  .promise();

app.get("/telephones", async (req, res) => {
  try {
    const temp = await db.query("SELECT * FROM telephones");
    const rows = temp[0];
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error retrieving posts: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/telephones", async (req, res) => {
  try {
    let postData = req.body;
    const [rows] = await db.query(
      "INSERT INTO `telephones` (`Nev`, `opRendszer`, `procOrajel`, `procMagok`, `kijelzoMeret`, `kijelzoFelbontas`, `RAM`, `leiras`, `ar`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [postData.Nev,postData.opRendszer,postData.procOrajel,postData.procMagok,postData.kijelzoMeret,postData.kijelzoFelbontas,postData.RAM,postData.leiras,postData.ar]
    );
    res.status(200).json({ message: "Telephone was successfully added!" });
  } catch (error) {
    console.error(`Error adding tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/telephones/:phoneId", async (req, res) => {
  try {
    let phoneId = parseInt(req.params.phoneId);
    const [rows] = await db.query("DELETE FROM telephones WHERE id = ?", [phoneId]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "Phone not found" });
    } else {
      res.status(200).json({ message: "Phone was successfully removed" });
    }
  } catch (error) {
    console.error(`Error deleting phone: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/tablets/:id', async (req, res) => {
  try {
    let tabletId = parseInt(req.params.id);
    const [rows] = await db.query('SELECT id, title, content, create_at FROM tablets WHERE id = ?', [tabletId]);
    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Tablet not found' });
    }
  } catch (error) {
    console.error(`Error retrieving tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/tablets/:id", async (req, res) => {
  try {
    const tabletId = parseInt(req.params.id);
    const { Nev, opRendszer, procOrajel, procMagok, kijelzoMeret, kijelzoFelbontas, RAM, leiras, ar } = req.body;
    const [result] = await db.query(
      "UPDATE tablets SET Nev = ?, opRendszer = ?, procOrajel = ?, procMagok = ?, kijelzoMeret = ?, kijelzoFelbontas = ?, RAM = ?, leiras = ?, ar = ? WHERE id = ?",
      [Nev, opRendszer, procOrajel, procMagok, kijelzoMeret, kijelzoFelbontas, RAM, leiras, ar, tabletId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Tablet not found" });
    } else {
      res.status(200).json({ message: "Tablet was successfully updated" });
    }
  } catch (error) {
    console.error(`Error updating tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
