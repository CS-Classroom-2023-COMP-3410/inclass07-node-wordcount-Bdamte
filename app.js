// Import required modules
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    try {
        // Read the file synchronously with UTF-8 encoding
        const content = fs.readFileSync('declaration.txt', 'utf8');
        return content;
    } catch (err) {
        console.error(chalk.red('Error reading file:'), err);
        process.exit(1);
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    // Split content into words using non-word characters as delimiters, filtering out empty strings.
    const words = content.split(/\W+/).filter(Boolean);
    words.forEach(word => {
        // Convert to lowercase for case-insensitive counting.
        const lowerWord = word.toLowerCase();
        if (wordCount[lowerWord]) {
            wordCount[lowerWord] += 1;
        } else {
            wordCount[lowerWord] = 1;
        }
    });
    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else if (count > 5) {
        return chalk.red(word);
    } else {
        // In case of an unexpected count value, return the word uncolored.
        return word;
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 *
 */
function printColoredLines(content, wordCount) {
    // Get the first 15 lines
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        // Preserve punctuation and spaces by using regex replacement
        const coloredLine = line.replace(/(\w+)/g, (match) => {
            const lowerMatch = match.toLowerCase();
            const count = wordCount[lowerMatch] || 0;
            return colorWord(match, count);
        });

        console.log(coloredLine);
    }
}


/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // Execute only if the file is run directly.
    processFile();
}

// Export the functions for testing
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
