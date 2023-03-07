let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "bird1.png";
const spriteWidth = 540;
const spriteHeight = 520;


let gameFrame = 0;
const staggerFrames = 6;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 6,
    },
    {
        name: 'jump',
        frames: 6,
    },
    {
        name: 'crush',
        frames: 9,
    },
    {
        name: 'little',
        frames: 9,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX + 41, frameY + 41, spriteWidth - 2, spriteHeight - 2, 38, 50, spriteWidth, spriteHeight);// -41, -41


    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
