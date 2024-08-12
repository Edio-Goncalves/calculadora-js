class CalcController {
  constructor() {
    this._audio = new Audio("click.mp3");
    this._audioOnOff = false;
    this._lastOperator = "";
    this._lastNumber = "";

    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");

    this._currentDate;

    this.initialize();
    this.initButtonsEvents();
    this.initKeyboard();
  }

  copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.displayCalc);
    }
  }

  pasteFromClipboard() {
    document.addEventListener("paste", (e) => {
      let text = e.clipboardData.getData("Text");

      this.displayCalc = parseFloat(text);
    });
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);

    this.setLastNumberToDisplay();
    this.pasteFromClipboard();

    document.querySelectorAll(".btn-ac").forEach((btn) => {
      btn.addEventListener("dblclick", (e) => {
        this.toggleAudio();
      });
    });
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else {
        this.pushOperation(value);

        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(newValue);

        this.setLastNumberToDisplay();
      }
    }
  }

  setError() {
    this.displayCalc = "Error";
  }

  addDot() {
    let lastOperation = this.getLastOperation();

    if (
      typeof lastOperation === "string" &&
      lastOperation.split("").indexOf(".") > -1
    )
      return;

    if (this.isOperator(lastOperation) || !lastOperation) {
      this.setLastOperation("0.");
    } else {
      this.setLastOperation(lastOperation.toString() + ".");
    }

    this.setLastNumberToDisplay();
  }

  execBtn(value) {
    this.playAudio();

    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        this.addOperation("+");
        break;
      case "subtracao":
        this.addOperation("-");
        break;
      case "divisao":
        this.addOperation("/");
        break;
      case "multiplicacao":
        this.addOperation("*");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "igual":
        this.calc();
        break;
      case "ponto":
        this.addDot();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;
      default:
        this.setError();
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let textBtn = btn.className.baseVal.replace("btn-", "");

        this.execBtn(textBtn);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    if (value.toString().length > 10) {
      this.setError();
      return false;
    }

    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
