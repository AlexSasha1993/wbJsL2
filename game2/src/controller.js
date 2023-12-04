export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.intervalId = null;
    this.isPlaying = false;

    this.intervalId = setInterval(() => {
      this.update();
    }, 1000);

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    if (this.isPlaying) {
      this.updateView();
    }
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  // другие методы

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.view.renderGameOverScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;

    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleKeyDown(event) {
    const state = this.game.getState();

    switch (event.code) {
      case 'Enter':
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 'ArrowLeft':
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 'ArrowUp':
        this.game.rotatePiece();
        this.updateView();
        break;
      case 'ArrowRight':
        this.game.movePieceRight();
        this.updateView();
        break;
      case 'ArrowDown':
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'ArrowDown':
        this.startTimer();
        break;
    }
  }
}
