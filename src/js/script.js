const givenWord = document.getElementById('given-word');
const res = document.getElementById('result');
const newBtn = document.getElementById('new-btn');
const filePath = `../wordlist.txt`
const input = document.getElementById('word-guess');
const resP = document.getElementById('result__text');
const title = document.getElementById('title');

// animation to run at beginning
const addAnimations = () => {
  input.classList.add('animation');
  givenWord.classList.add('animation');
  title.classList.add('animation');
};

const removeAnimations = () => {
  input.classList.remove('animation');
  givenWord.classList.remove('animation');
  title.classList.remove('animation');
};
addAnimations();

// fetch wordlist dictionary and grab a random word index
const generateNewWord = () => {
  fetch(filePath)
  .then(response => response.text())
  .then(text => {
    const wordDict = text.split(/\s+/);
    givenWord.innerText = wordDict[Math.floor(Math.random() * wordDict.length)];
  })
  .catch(error => console.error('Error loading file:', error));
};
generateNewWord();

const isAnagram = () => {
  const wordGuess = input.value.trim();
  const givenWordText = givenWord.innerText.trim();
  removeAnimations();

  if (wordGuess === '') {
    alert('Your answer is blank. Please enter a word.');
  } 
  else if (wordGuess.toLowerCase() === givenWordText.toLowerCase()) {
    resP.innerHTML = `<span class="underline text-result">${wordGuess}</span> is the same as the given word. Please enter a different word.`; 
    newBtn.classList.add('hidden');
  } 
  else {
    const sortedGivenWord = givenWordText.toLowerCase().split('').sort().join('');
    const sortedWordGuess = wordGuess.toLowerCase().split('').sort().join('');

    if (sortedGivenWord === sortedWordGuess) {
      resP.innerHTML = `<span class="underline text-result">${wordGuess}</span> is an anagram of <span class="underline">${givenWordText}</span>. Good job!`;
      newBtn.classList.remove('hidden');
    } else {
      resP.innerHTML = `<span class="underline text-result">${wordGuess}</span> is not an anagram of <span class="underline">${givenWordText}</span>. Try Again!`;
      newBtn.classList.add('hidden');
    }
  }
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    isAnagram();
  }
});

newBtn.addEventListener('click', () => {
  generateNewWord();
  newBtn.classList.add('hidden');
  resP.innerHTML = '';
  input.value = '';
  addAnimations();
});