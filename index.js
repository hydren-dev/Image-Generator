const { createCanvas } = require('canvas');
const express = require('express');
const app = express();

// Route to generate image with text
app.get('/api/v1/:name/:description', (req, res) => {
    const { name, description } = req.params;

    // Set the canvas dimensions
    const width = 500; // Adjust width as needed
    const height = 300; // Adjust height to fit two lines of text

    // Create a transparent canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Set the background to transparent (default is transparent)
    context.clearRect(0, 0, width, height);

    // Configure styles for the main text
    context.fillStyle = 'white'; // Text color
    context.font = 'bold 50px Arial'; // Font style (main text)
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Draw the main text (name)
    context.fillText(name, width / 2, 50); // Main text position

    // Configure styles for the subtext (description)
    context.font = '30px Arial'; // Smaller font for the subtext
    context.fillStyle = 'gray'; // Subtext color

    // Draw the subtext (description)
    context.fillText(description, width / 2, 120); // Subtext position below the main text

    // Send the generated image as a response
    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));
});

app.get('*', (req, res) => {
    res.status(404)
	const notfound = `
<title>404 NOT FOUND</title>
<div class="error">404</div>
<br /><br />
<span class="info">Page not found</span>
<img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" class="static" />
<style>
   @import url(https://fonts.googleapis.com/css?family=Gilda+Display);

html {
  background: radial-gradient(#000, #111);
  color: white;
  overflow: hidden;
  height: 100%;
  user-select: none;
}

.static {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  top: -100px;
  opacity: 0.05;
  z-index: 230;
  user-select: none;
  user-drag: none;
}

.error {
  text-align: center;
  font-family: 'Gilda Display', serif;
  font-size: 95px;
  font-style: italic;
  text-align: center;
  width: 100px;
  height: 60px;
  line-height: 60px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -60px;
  right: 0;
  animation: noise 2s linear infinite;
  overflow: default;
}

.error:after {
  content: '404';
  font-family: 'Gilda Display', serif;
  font-size: 100px;
  font-style: italic;
  text-align: center;
  width: 150px;
  height: 60px;
  line-height: 60px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  color: blue;
  animation: noise-1 .2s linear infinite;
}

.info {
  text-align: center;
  font-family: 'Gilda Display', serif;
  font-size: 15px;
  font-style: italic;
  text-align: center;
  width: 200px;
  height: 60px;
  line-height: 60px;
  margin: auto;
  position: absolute;
  top: 140px;
  bottom: 0;
  left: 0;
  right: 0;
  animation: noise-3 1s linear infinite;
}

.error:before {
  content: '404';
  font-family: 'Gilda Display', serif;
  font-size: 100px;
  font-style: italic;
  text-align: center;
  width: 100px;
  height: 60px;
  line-height: 60px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  color: red;
  animation: noise-2 .2s linear infinite;
}

@keyframes noise-1 {
  0%, 20%, 40%, 60%, 70%, 90% {opacity: 0;}
  10% {opacity: .1;}
  50% {opacity: .5; left: -6px;}
  80% {opacity: .3;}
  100% {opacity: .6; left: 2px;}
}

@keyframes noise-2 {
  0%, 20%, 40%, 60%, 70%, 90% {opacity: 0;}
  10% {opacity: .1;}
  50% {opacity: .5; left: 6px;}
  80% {opacity: .3;}
  100% {opacity: .6; left: -2px;}
}

@keyframes noise {
  0%, 3%, 5%, 42%, 44%, 100% {opacity: 1; transform: scaleY(1);}  
  4.3% {opacity: 1; transform: scaleY(1.7);}
  43% {opacity: 1; transform: scaleX(1.5);}
}

@keyframes noise-3 {
  0%,3%,5%,42%,44%,100% {opacity: 1; transform: scaleY(1);}
  4.3% {opacity: 1; transform: scaleY(4);}
  43% {opacity: 1; transform: scaleX(10) rotate(60deg);}
}
</style>`
	res.send(notfound);
});

// Start the Express server
const PORT = process.env.PORT || 25565;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
