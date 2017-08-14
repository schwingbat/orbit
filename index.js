const express = require('express');
const app = express();
const PORT = process.env.PORT || 3035;

app.use(express.static('build'));

app.listen(PORT, () => {
	console.log(`Orbit is running on port ${PORT}`);
});