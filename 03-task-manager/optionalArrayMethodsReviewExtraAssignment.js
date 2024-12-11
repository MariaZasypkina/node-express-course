// Review of JavaScript iterative Array methods (`.map`, `.filter` and `.forEach`)

/////////////////////////// CHALLENGES ////////////////////////////////////////

// Each challenge will be related to this array of names. It will pose a
// problem related to these names, and then implement the solution. The
// challenges are:
//
// - Create a new array with only each person's last name
// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.
// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]
// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
//
// For an extra assignment, you may implement these yourself! Include your
// changes to this file with your MR for week 3.

const names = [
  'Dimitry SantiAgo',
  'Carlos d. Perez',
  'tam  person',
  'Roman Rodriguez',
  'Mariana Gomez',
  'Amy You',
  'Maria Zasypkina',
  'Lexi Za',
  'Greg Shulman',

];

// - Create a new array with only each person's last name

const lastNames = names.map((name) => {
  const nameParts = name.split(' ');
  return nameParts.pop();
});

console.log('Everyone last names:', lastNames);

// - Filter names that don't match the format "<first> <last>"

const correctFormat = /^\w+ \w+$/;
const validNames = names.filter((name) => {
return name.match(correctFormat);
});
console.log('Valid names:', validNames);

// - Create a new array where everyone's name is converted to "Title Case"

const filteredNames = validNames
  .map((name) => {
    const words = name.split(' ');
    const titledNames = words.map((word) => {
      const firstLetter = word[0].toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });
    return titledNames.join(' ');
  })
  .filter((name) => {
    const lastName = name.split(' ').pop();
    return lastName.slice(-1).toLowerCase() !== 'z'; // Check if last letter is NOT "z"
  });
console.log('Filtered Names (No Z):', filteredNames);

const result = filteredNames.map((name) => `Hey there ${name}! Want to sign up?`);
console.log('Result:', result);
