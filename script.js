const refreshButton = document.querySelector("button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
// updating the circle position after the screen resizing
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
    resetValues();
    drawCircleInstantly();
});
// clearing canvas and drawing circle again
refreshButton.addEventListener("click", () => {
    resetValues();
    rangeIndex = 0;
});
const DEGREES = 360;
const QUARTER = DEGREES / 4;
const ANIMATION_SPEED = 60;
const range = 7.25; // 7.25 = full circle, 0 = four dots
const radius = canvas.height > canvas.width ? canvas.width / 20 : canvas.height / 20;
const dotThickness = 0.05;
let circleX = canvas.width / (radius * 2);
let circleY = canvas.height / (radius * 2);
class Ball {
    constructor(x, y, color) {
        this.pos = { x: x, y: y };
        color != null ? this.color = color : this.color = "white";
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, dotThickness * radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
let balls = [];
const renderBalls = () => balls.forEach((ball) => ball.draw());
// adds 180 dots about the x axis
const addBallX = (i) => {
    const center = { x: circleX, y: circleY };
    const posX = (i * (range / QUARTER));
    const posY = Math.sqrt(25 - Math.pow(posX, 2));
    const ballPos1 = { x: (center.x + posX) * radius, y: (center.y + posY) * radius };
    const ballPos2 = { x: (center.x - posX) * radius, y: (center.y + posY) * radius };
    const ballPos3 = { x: (center.x + posX) * radius, y: (center.y - posY) * radius };
    const ballPos4 = { x: (center.x - posX) * radius, y: (center.y - posY) * radius };
    balls.push(new Ball(ballPos1.x, ballPos1.y));
    balls.push(new Ball(ballPos2.x, ballPos2.y));
    balls.push(new Ball(ballPos3.x, ballPos3.y));
    balls.push(new Ball(ballPos4.x, ballPos4.y));
};
// adds 180 dots about y axis
const addBallY = (i) => {
    const center = { x: circleX, y: circleY };
    const posY = (i * (range / QUARTER));
    const posX = Math.sqrt(25 - Math.pow(posY, 2));
    const ballPos1 = { x: (center.x + posX) * radius, y: (center.y + posY) * radius };
    const ballPos2 = { x: (center.x - posX) * radius, y: (center.y + posY) * radius };
    const ballPos3 = { x: (center.x + posX) * radius, y: (center.y - posY) * radius };
    const ballPos4 = { x: (center.x - posX) * radius, y: (center.y - posY) * radius };
    balls.push(new Ball(ballPos1.x, ballPos1.y));
    balls.push(new Ball(ballPos2.x, ballPos2.y));
    balls.push(new Ball(ballPos3.x, ballPos3.y));
    balls.push(new Ball(ballPos4.x, ballPos4.y));
};
let rangeIndex = 0;
const drawCircle = () => {
    if (rangeIndex >= 45)
        return;
    addBallX(rangeIndex);
    addBallY(rangeIndex);
    rangeIndex++;
};
const drawCircleInstantly = () => {
    for (let i = 0; i < 45; i++) {
        addBallX(i);
        addBallY(i);
    }
};
const resetValues = () => {
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleX = canvas.width / (radius * 2);
    circleY = canvas.height / (radius * 2);
};
const init = () => {
    drawCircle();
    renderBalls();
};
init();
setInterval(init, 1000 / ANIMATION_SPEED);
