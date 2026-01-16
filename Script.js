// Sample videos
const videos = [
    { title: "Anime 1", src: "sample-video.mp4", img: "https://via.placeholder.com/200x300" },
    { title: "Anime 2", src: "sample-video2.mp4", img: "https://via.placeholder.com/200x300" },
    { title: "Anime 3", src: "sample-video3.mp4", img: "https://via.placeholder.com/200x300" },
    { title: "Anime 4", src: "sample-video4.mp4", img: "https://via.placeholder.com/200x300" },
    { title: "Anime 5", src: "sample-video5.mp4", img: "https://via.placeholder.com/200x300" },
];

// Sections
const trendingCarousel = document.getElementById('trendingCarousel');
const recommendedCarousel = document.getElementById('recommendedCarousel');
const newReleasesCarousel = document.getElementById('newReleasesCarousel');
const playlists = [];

// Populate carousels
function createCard(video) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${video.img}" alt="${video.title}">
        <div class="overlay">
            <button onclick="playVideo('${video.src}')">Play</button>
            <button onclick="addToPlaylist('${video.src}', '${video.title}')">+ Playlist</button>
        </div>
        <h4>${video.title}</h4>
    `;
    return card;
}

videos.forEach(v => {
    trendingCarousel.appendChild(createCard(v));
    recommendedCarousel.appendChild(createCard(v));
    newReleasesCarousel.appendChild(createCard(v));
});

// Scroll buttons
document.querySelectorAll('.scroll-left').forEach(btn => {
    btn.addEventListener('click', () => {
        const carousel = btn.nextElementSibling;
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
});
document.querySelectorAll('.scroll-right').forEach(btn => {
    btn.addEventListener('click', () => {
        const carousel = btn.previousElementSibling;
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
});

// Video Player
function playVideo(src) {
    document.getElementById('videoPlayer').src = src;
}

// Comments
const commentInput = document.getElementById('commentInput');
const postComment = document.getElementById('postComment');
const commentList = document.getElementById('commentList');

postComment.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if(text) {
        const li = document.createElement('li');
        li.textContent = `User: ${text}`;
        commentList.appendChild(li);
        commentInput.value = '';
    }
});

// Playlist
const playlistList = document.getElementById('playlistList');
function addToPlaylist(src, title) {
    if(!playlists.includes(src)) {
        playlists.push(src);
        const li = document.createElement('li');
        li.textContent = title;
        playlistList.appendChild(li);
    }
}

// Upload
const videoUpload = document.getElementById('videoUpload');
const uploadBtn = document.getElementById('uploadBtn');

uploadBtn.addEventListener('click', () => {
    const file = videoUpload.files[0];
    if(file) {
        const url = URL.createObjectURL(file);
        const newVideo = { title: file.name, src: url, img: "https://via.placeholder.com/200x300" };
        videos.push(newVideo);
        trendingCarousel.appendChild(createCard(newVideo));
        recommendedCarousel.appendChild(createCard(newVideo));
        newReleasesCarousel.appendChild(createCard(newVideo));
        videoUpload.value = '';
        alert("Video uploaded!");
    }
});
