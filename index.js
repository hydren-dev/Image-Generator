const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const readline = require('readline');

async function generateTextImage(mainText, subText, outputFilename) {
    // Set the canvas dimensions
    const width = 500; // Adjust width as needed
    const height = 300; // Adjust height to fit two lines of text

    // Create a transparent canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Optional: Load a custom font if available
    // Example: registerFont('./path-to-font.ttf', { family: 'CustomFont' });

    // Set the background to transparent (default is transparent)
    context.clearRect(0, 0, width, height);

    // Configure styles for the main text
    context.fillStyle = 'white'; // Text color
    context.font = 'bold 50px Arial'; // Font style (main text)
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Draw the main text
    context.fillText(mainText, width / 2, 50); // Main text position

    // Configure styles for the subtext
    context.font = '30px Arial'; // Smaller font for the subtext
    context.fillStyle = 'gray'; // Subtext color

    // Draw the subtext
    context.fillText(subText, width / 2, 120); // Subtext position below the main text

    // Save the image as a PNG with a transparent background
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFilename, buffer);

    console.log(`Text image created: ${outputFilename}`);
}


function askForInput(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("What's the name? : ", (name) => {
	  rl.question("What's the file name? : ", (file) => {
        rl.question("What's the description? : ", (description) => {
            rl.close();
            callback(name, description, file);
			askForInput(callback);
        });
	 });
 });
}

askForInput((name, description, file) => {
    generateTextImage(name, description, file);
});
