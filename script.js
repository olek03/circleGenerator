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
const centeredPosition = canvas.height > canvas.width ? canvas.width / 20 : canvas.height / 20;
const dotThickness = 0.05;
const radius = 7;
let circleX = canvas.width / (centeredPosition * 2);
let circleY = canvas.height / (centeredPosition * 2);
class Ball {
    constructor(x, y, color) {
        this.pos = { x: x, y: y };
        color != null ? this.color = color : this.color = "white";
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, dotThickness * centeredPosition, 0, Math.PI * 2);
        ctx.fill();
    }
}
let balls = [];
const renderBalls = () => balls.forEach((ball) => ball.draw());
// adds 180 dots about the x axis
const addBallX = (i) => {
    const center = { x: circleX, y: circleY };
    const posX = i * (radius / QUARTER);
    const posY = Math.sqrt(Math.pow(radius, 2) - Math.pow(posX, 2));
    const ballPos1 = { x: (center.x + posX) * centeredPosition, y: (center.y + posY) * centeredPosition };
    const ballPos2 = { x: (center.x - posX) * centeredPosition, y: (center.y + posY) * centeredPosition };
    const ballPos3 = { x: (center.x + posX) * centeredPosition, y: (center.y - posY) * centeredPosition };
    const ballPos4 = { x: (center.x - posX) * centeredPosition, y: (center.y - posY) * centeredPosition };
    balls.push(new Ball(ballPos1.x, ballPos1.y));
    balls.push(new Ball(ballPos2.x, ballPos2.y));
    balls.push(new Ball(ballPos3.x, ballPos3.y));
    balls.push(new Ball(ballPos4.x, ballPos4.y));
};
// adds 180 dots about y axis
const addBallY = (i) => {
    const center = { x: circleX, y: circleY };
    const posY = i * (radius / QUARTER);
    const posX = Math.sqrt(Math.pow(radius, 2) - Math.pow(posY, 2));
    const ballPos1 = { x: (center.x + posX) * centeredPosition, y: (center.y + posY) * centeredPosition };
    const ballPos2 = { x: (center.x - posX) * centeredPosition, y: (center.y + posY) * centeredPosition };
    const ballPos3 = { x: (center.x + posX) * centeredPosition, y: (center.y - posY) * centeredPosition };
    const ballPos4 = { x: (center.x - posX) * centeredPosition, y: (center.y - posY) * centeredPosition };
    balls.push(new Ball(ballPos1.x, ballPos1.y));
    balls.push(new Ball(ballPos2.x, ballPos2.y));
    balls.push(new Ball(ballPos3.x, ballPos3.y));
    balls.push(new Ball(ballPos4.x, ballPos4.y));
};
let rangeIndex = 0;
const drawCircle = () => {
    if (rangeIndex >= QUARTER)
        return;
    addBallX(rangeIndex);
    addBallY(rangeIndex);
    rangeIndex++;
};
const drawCircleInstantly = () => {
    for (let i = 0; i < QUARTER; i++) {
        addBallX(i);
        addBallY(i);
    }
};
const resetValues = () => {
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleX = canvas.width / (centeredPosition * 2);
    circleY = canvas.height / (centeredPosition * 2);
};
const init = () => {
    drawCircle();
    renderBalls();
};
init();
setInterval(init, 1000 / ANIMATION_SPEED);
