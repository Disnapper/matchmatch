const gamebody = document.querySelector('.gamebody');

class Game {
    constructor(difSel, cardSel) {
        this.difSel = difSel;
        this.cardSel = cardSel;
        this.size = null;
        this.url = null;
        this.value = null;
        this.amount = null;
        this.bufferHTML = null;
        this.count = 0;
        this.current = null;
        this.min = null;
        this.sec = null;
    }

    choice() {
        switch (this.cardSel) {
            case 1:
                this.url = 'card1';
                break;
            case 2:
                this.url = 'card2';
                break;
            case 3:
                this.url = 'card3';
                break;
        }

        switch (this.difSel) {
            case 1:
                this.arr = [1, 1, 2, 2, 3, 3];
                this.size = 'easy';
                this.amount = 6;
                break;
            case 2:
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
                this.size = 'medium';
                this.amount = 12;
                break;
            case 3:
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
                this.size = 'hard';
                this.amount = 20;
                break;
        }
    }

    build() {
        gamebody.classList.add('wrapper');
        gamebody.innerHTML = `
        <div class="timer">
            <span class="minutes"></span>
            :
            <span class="seconds">
            </span>
        </div>
        `;
        this.bufferHTML = `<div class="container ${this.size}">`;
        for (let i = 0; i < this.amount; i++) {
            this.value = Math.round(Math.random() * (this.arr.length) - 0.5);
            this.bufferHTML += `
            <div class="card" num=${this.arr[this.value]}>
                <div class="front ${this.url}"></div>
                <div class="back">${this.arr[this.value]}</div>
            </div>
            `
            this.arr.splice(this.value, 1);
        }
        this.bufferHTML += `</div>`
        gamebody.innerHTML += this.bufferHTML;
    }

    handle() {
        gamebody.addEventListener('click', (event) => {
            let target = event.target;
            while (target !== gamebody) {
                if (target.classList.contains('card')) {
                    if (this.count === 2) {
                        return false;
                    };

                    target.classList.add('flipped');
                    this.count = this.count + 1;

                    if (this.count === 1) {
                        this.current = target;
                    };

                    if (target === this.current) {
                        this.count = 1;
                    };

                    if (this.count === 2) {
                        if (this.current.getAttribute('num') === target.getAttribute('num')) {
                            setTimeout(() => {
                                this.current.classList.add('disappear');
                                target.classList.add('disappear');
                                this.amount = this.amount - 2;
                                this.count = 0;
                                if (this.amount === 0) {
                                    this.win();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                this.current.classList.remove('flipped');
                                target.classList.remove('flipped');
                                this.count = 0;
                            }, 1000);
                        }
                    }
                    return;
                }
                target = target.parentNode;
            }
        });
    }

    win() {
        gamebody.classList.remove('wrapper');
        gamebody.innerHTML = `
        <h2 class="win_title">You win!</h2>
        <div class=win_text>
        <p>Complited at ${this.size} difficulty
         in ${this.min} minutes and ${this.sec} seconds</p>
        </div>
        <button class="win button">Restart game</button>
        <button id="Leaders" class="leaders-table">Leaders Table</button>`;
        let leaders = document.getElementById("Leaders");
       
        leaders.addEventListener("click",leadersTable);
        function leadersTable() {
            gamebody.innerHTML = '';
            entryPoint = new StartScreen();
            gamebody.classList.add('wrapper');
        }
        const win = document.querySelector('.win');
        win.addEventListener('click', () => {
            gamebody.innerHTML = '';
            entryPoint = new StartScreen();
            entryPoint.build();
            entryPoint.handle();
        });
    }

    formatNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    timer() {
        const minutes = document.querySelector('.minutes');
        const seconds = document.querySelector('.seconds');
        let min = 0;
        let sec = 0;
        seconds.innerHTML = `00`;
        minutes.innerHTML = `00`;
        setInterval(() => {
            sec = sec + 1;
            if (sec === 60) {
                min = min + 1;
                sec = 0;
            };
            this.min = this.formatNumber(min);
            this.sec = this.formatNumber(sec);
            seconds.innerHTML = this.formatNumber(sec);
            minutes.innerHTML = this.formatNumber(min);
        }, 1000)
    }

    init() {
        this.choice();
        this.build();
        this.handle();
        this.timer();
    }
};



