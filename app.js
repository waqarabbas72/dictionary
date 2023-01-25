const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
;
const searchBtn = document.getElementById("searchBtn");
const result = document.querySelector(".result");
const audio = document.getElementById('audio')


searchBtn.addEventListener("click", (e) => {

    const inputArea = document.getElementById("inputArea").value
    fetch(`${url}${inputArea}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);


      result.innerHTML = `
        <!-- word Details -->
        <div class="word-details">
          <div>
              <h3>${data[0].word}</h3>
              <div class="d-flex">
                  <p>${data[0].meanings[0].partOfSpeech}</p>
                  <p>/ ${data[0].phonetics[1].text} / </p>
              </div>
            </div>
            <div onclick = "playSound()">
              <i class="bi bi-volume-up-fill" id="soundBtn" ></i>
            </div>
        </div>

        <!-- Word-Meaning -->
        <div class="word-meaning">
          <p>${data[0].meanings[0].definitions[0].definition}</p>
        </div>

        <!-- Word-example-Sentence -->
        <div class="word-example">
          <p>${data[0].meanings[0].definitions[0].example || ""}</p>
        </div>
        `;

        audio.setAttribute('src' , `${data[0].phonetics[0].audio}`);
        console.log(audio);
    })
    .catch(()=> {
        result.innerHTML = `
          <h3 class = "error">Sorry! We couldn't find the word.</h3>
        `
    })
 
});


function playSound(){
    audio.play()
}