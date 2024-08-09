const givenWord = document.getElementById('given-word').innerText;
const res = document.getElementById('result');
const checkBtn = document.getElementById('check-btn');

const resP = document.createElement('p');
res.appendChild(resP);

checkBtn.addEventListener('click', () => {
  const wordGuess = document.getElementById('word-guess');
  if (wordGuess.value === '') {
    alert('Your answer is blank. Please enter a word.');
  }
  else {
    if (givenWord.split('').sort().join('') === wordGuess.value.split('').sort().join('')) {
      resP.innerHTML = `<u>${wordGuess.value}</u> is an anagram of <u>${givenWord}</u>`; 
    } else {
      resP.innerHTML = `<u>${wordGuess.value}</u> is NOT an anagram of <u>${givenWord}</u>.`; 
    }
  }
  wordGuess.value = '';
});