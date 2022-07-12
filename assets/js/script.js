// ---------------------------------------------------------------------------------------
var allMusic = [
  {
    name: "Đen - Trốn Tìm ft",
    artist: "Đen",
    img: "ĐenĐen",
    src: "Trốn Tìm"
  },
  {
    name: "Rapcoustic 5",
    artist: "Đen x Kimmese x Lynk Lee",
    img: "Rapcoustic5",
    src: "Rapcoustic5",
  },
   {
    name: "Đen - một triệu like ft",
    artist: "Đen",
    img: "Một triệu like",
    src: "Một triệu like"
  },
];

// -------------------------------------------------------------------------------------------------------------------

const $ = document.querySelector.bind(document);
const wrapper = $(".wrapper");

musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");
mainAudio = wrapper.querySelector('#main-audio')
const ulTag = wrapper.querySelector("ul");
console.log(mainAudio)
// ---------------------------------------------------------------------------------------------------------------------------
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

isMusicPaused = true;


window.addEventListener("load", () => {
  getMusic(musicIndex);
  playingSong();
});


const getMusic = (indexNumb) => {
  musicName.innerText = allMusic[indexNumb - 1].name; // list ten
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `./assets/img/${allMusic[indexNumb - 1].src}.jpg`; // lay du lieu anh
  mainAudio.src = `./assets/song/${allMusic[indexNumb - 1].src}.mp3`; // lay du lieu list nhac
};



// tao 1 list nhac tu object
for (let i = 0; i < allMusic.length; ++i) {             // tao 1 the li the hien cac list nhac
  let liTag = `                                    
	<li li-index="${i + 1}">
            <div class = "row"> 
	       <span>${allMusic[i].name}</span>
	       <p>${allMusic[i].artist}</p>
	    </div>
	    <span id="${allMusic[i].src}" class="audio-duration">3:40<span>
	    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
	</li>
	`;
  ulTag.insertAdjacentHTML("beforeend", liTag);  
}

// chay nhac qua lan click chuot
const playingSong = () => {
  const allLiTag = ulTag.querySelectorAll("li");  // lay toan bo du lieu the <li>

  for (let i = 0; i < allLiTag.length; i++) {    // duyet danh sach nhac
    let audioTag = allLiTag[i].querySelector(".audio-duration");  //query den file audio

    if (allLiTag[i].classList.contains("playing")) {      // neu the li chua class playing lap tuc xoa ten class playing
      allLiTag[i].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");    //lay atribute audioTag tu dong code  68
      audioTag.innerText = adDuration;                     // tra ve so phut va giay cua file nhac
    }

    if (allLiTag[i].getAttribute("li-index") == musicIndex) {   //neu  atribute class li-index == musicIndex => add 1 class vao tag <li>
      allLiTag[i].classList.add("playing");    
      audioTag.innerText = "Playing";                 // the hien list do dang chay nhac
    }

    allLiTag[i].setAttribute("onclick", "clicked(this)");  // clic nhac (click(this) la click thang thuoc tinh <li>)
  }
};

//click cac bai hat
const clicked = (Element) => {
  let getLiIndex = Element.getAttribute("li-index"); 
  musicIndex = getLiIndex;  // neu 
  getMusic(musicIndex);
  playMusic();
  playingSong();
};

// -------------------------------------------------------------------------------
const playMusic = () => {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
};

const pauseMusic = () => {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
};

const prevMusic = () => {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  getMusic(musicIndex);
  playMusic();
  playingSong();
};

const nextMusic = () => {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  getMusic(musicIndex);
  playMusic();
  playingSong()
};

// ----------------------------------------------------------------------------------------

playPauseBtn.addEventListener("click", function () {
  const isMusicPlay = wrapper.classList.contains("paused");
  console.log(mainAudio)
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

prevBtn.addEventListener("click", function () {
  prevMusic();
  playingSong();
});

nextBtn.addEventListener("click", function () {
  nextMusic();
  playingSong()
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", function () {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song loopped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});
// ----------------------------------------------------------------------------------------------------------------------------------------

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time");
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`
  });
   let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      getMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});
// ------------------------------------------------------------------------------------------------------------------------------------------------
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});
