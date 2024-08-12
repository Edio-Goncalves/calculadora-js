class calcController {
  constructor() {
    this.location = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this.location);
    this.displayTime = this.currentDate.toLocaleTimeString(this.location);
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }
  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }
  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this._currentDate = value;
  }
}
