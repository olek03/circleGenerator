const refreshButton: HTMLButtonElement = document.querySelector("button")
const canvas: HTMLCanvasElement = document.querySelector("canvas")
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight * 0.9

// updating the circle position after the screen resizing
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.9

    resetValues()
    drawCircleInstantly()
})

// clearing canvas and drawing circle again
refreshButton.addEventListener("click", () => {
    resetValues()
    rangeIndex = 0
})

const DEGREES: number = 360
const QUARTER: number = DEGREES / 4
const ANIMATION_SPEED: number = 60

const centeredPosition: number = canvas.height > canvas.width ? canvas.width / 20 : canvas.height / 20
const dotThickness: number = 0.05
const radius: number = 7

let circleX: number = canvas.width / (centeredPosition * 2)
let circleY: number = canvas.height / (centeredPosition * 2)

interface position {
    x: number
    y: number
}

interface ballProps {
    pos: position
    color: string
    draw: VoidFunction
}

class Ball implements ballProps {
    public pos: position
    public color: string

    constructor(x: number, y: number, color?: string) {
        this.pos = { x: x, y: y }
        color != null ? this.color = color : this.color = "white"
    }

    public draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, dotThickness * centeredPosition, 0, Math.PI * 2)
        ctx.fill()
    }
}

let balls: ballProps[] = []

const renderBalls = (): void => balls.forEach((ball: ballProps) => ball.draw())

// adds 180 dots about the x axis
const addBallX = (i: number): void => {
    const center: position = { x: circleX, y: circleY }

    const posX: number = i * (radius / QUARTER)
    const posY: number = Math.sqrt(Math.pow(radius, 2) - Math.pow(posX, 2))

    const ballPos1: position = { x: (center.x + posX) * centeredPosition, y: (center.y + posY) * centeredPosition }
    const ballPos2: position = { x: (center.x - posX) * centeredPosition, y: (center.y + posY) * centeredPosition }
    const ballPos3: position = { x: (center.x + posX) * centeredPosition, y: (center.y - posY) * centeredPosition }
    const ballPos4: position = { x: (center.x - posX) * centeredPosition, y: (center.y - posY) * centeredPosition }

    balls.push(new Ball(ballPos1.x, ballPos1.y))
    balls.push(new Ball(ballPos2.x, ballPos2.y))
    balls.push(new Ball(ballPos3.x, ballPos3.y))
    balls.push(new Ball(ballPos4.x, ballPos4.y))

}

// adds 180 dots about y axis
const addBallY = (i: number): void => {
    const center: position = { x: circleX, y: circleY }

    const posY: number = i * (radius / QUARTER)
    const posX: number = Math.sqrt(Math.pow(radius, 2) - Math.pow(posY, 2))

    const ballPos1: position = { x: (center.x + posX) * centeredPosition, y: (center.y + posY) * centeredPosition }
    const ballPos2: position = { x: (center.x - posX) * centeredPosition, y: (center.y + posY) * centeredPosition }
    const ballPos3: position = { x: (center.x + posX) * centeredPosition, y: (center.y - posY) * centeredPosition }
    const ballPos4: position = { x: (center.x - posX) * centeredPosition, y: (center.y - posY) * centeredPosition }

    balls.push(new Ball(ballPos1.x, ballPos1.y))
    balls.push(new Ball(ballPos2.x, ballPos2.y))
    balls.push(new Ball(ballPos3.x, ballPos3.y))
    balls.push(new Ball(ballPos4.x, ballPos4.y))
}

let rangeIndex: number = 0

const drawCircle = (): void => {
    if (rangeIndex >= QUARTER) return

    addBallX(rangeIndex)
    addBallY(rangeIndex)

    rangeIndex++
}

const drawCircleInstantly = (): void => {
    for (let i = 0; i < QUARTER; i++) {
        addBallX(i)
        addBallY(i)
    }
}

const resetValues = (): void => {
    balls = []
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    circleX = canvas.width / (centeredPosition * 2)
    circleY = canvas.height / (centeredPosition * 2)
}

const init = (): void => {
    drawCircle()
    renderBalls()
}
init()

setInterval(init, 1000 / ANIMATION_SPEED)
