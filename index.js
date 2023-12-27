import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://api.blockchain.com/v3/exchange/tickers/";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/get-crypto", async (req, res) => {
    if (req.body.dropdownMenu !== "none") {
        const userCrypto = req.body.dropdownMenu;

        try {
            console.log(API_URL + userCrypto);
            const result = await axios.get(API_URL + userCrypto);
            console.log(result.data);
            console.log(typeof result.data);
            res.render("index", { userCrypto: result.data, });
        } catch(error) {
            res.send(error.message);
        }

    } else {
        const userCrypto = req.body.userCrypto;

        try {
            console.log(API_URL + userCrypto);
            const result = await axios.get(API_URL + userCrypto);
            console.log(result.data);
            console.log(typeof result.data);
            res.render("index", { userCrypto: result.data, });
        } catch(error) {
            res.send(error.message);
        }
    }


    
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
