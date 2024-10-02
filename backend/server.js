const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const translations = require('./translations.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/translations', (req, res) => {
    res.json(translations);
});

app.post('/check-translations', (req, res) => {
    const userTranslations = req.body;
    let correctCount = 0;

    userTranslations.forEach((userTranslation, index) => {
        if (userTranslation === translations[index].english) {
            correctCount++;
        }
    });

    const percentageCorrect = (correctCount / translations.length) * 100;
    res.json({ percentageCorrect });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
