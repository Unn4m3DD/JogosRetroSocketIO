module.exports = class Snake {
  constructor(id, width, height) {
    this.width = width
    this.height = height
    this.id = id
    let middle = { x: Math.floor(width / 2), y: Math.floor(height / 2) }
    this.snake = [{ x: middle.x - 1, y: middle.y }, middle, { x: middle.x + 1, y: middle.y }]
    this.apple = this.randomApple()
    this.Directions = {
      STOP: 0,
      Right: 1,
      Left: 2,
      Up: 3,
      Down: 4,
    };
    this.dir = this.Directions.STOP
  }
  logic() {
    if (this.dir === this.Directions.STOP) return
    this.move()
    if (this.collide()) return "Lost"
    if (this.gotApple()) this.grow()
  }
  grow() {
    this.snake.push(this.snake[this.snake.length - 1])
  }
  collide() {
    for (let piece of this.snake.slice(1)) {
      if (piece.x === this.snake[0].x && piece.y === this.snake[0].y)
        return true
    }
    return false
  }
  gotApple() {
    if (this.snake[0].x === this.apple.x && this.snake[0].y === this.apple.y) {
      this.apple = this.randomApple()
      return true
    }
    return false
  }
  randomApple() {
    return {
      x: randomRange(0, this.width),
      y: randomRange(0, this.height)
    }
  }
  render() {
    let board = Array(this.width)
    for (let i = 0; i < this.width; i++)
      board[i] = Array(this.height)
    let to_place = 3
    for (let piece of this.snake) {
      board[piece.x][piece.y] = to_place
      to_place = 1
    }
    board[this.apple.x][this.apple.y] = 2
    return board
  }
  move() {
    this.snake = this.snake.slice(0, this.snake.length - 1)
    switch (this.dir) {
      case this.Directions.Up:
        this.snake.unshift({ x: mod(this.snake[0].x, this.width), y: mod(this.snake[0].y - 1, this.height) })
        break;
      case this.Directions.Down:
        this.snake.unshift({ x: mod(this.snake[0].x, this.width), y: mod(this.snake[0].y + 1, this.height) })
        break;
      case this.Directions.Right:
        this.snake.unshift({ x: mod(this.snake[0].x + 1, this.width), y: mod(this.snake[0].y, this.height) })
        break;
      case this.Directions.Left:
        this.snake.unshift({ x: mod(this.snake[0].x - 1, this.width), y: mod(this.snake[0].y, this.height) })
        break;
    }

  }
  changeDir(dir) {
    if (dir === this.Directions.Up && this.dir == this.Directions.Down)
      return
    if (dir === this.Directions.Down && this.dir == this.Directions.Up)
      return
    if (dir === this.Directions.Left && this.dir == this.Directions.Right)
      return
    if (dir === this.Directions.Right && this.dir == this.Directions.Left)
      return
    this.dir = dir;
  }
}
function randomRange(min, max) {
  thn = Math.ceil(min);
  max = Math.floor(max - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function mod(a, b) { return ((a % b) + b) % b }