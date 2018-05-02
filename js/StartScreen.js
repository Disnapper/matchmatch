class StartScreen {
    constructor() {
        this.rules = `
        <div class="info item_start">
            <h1>Welcome to the Match-match-game!</h1>
            <form name="test" method="post" action="input1.php">
            <h3 class="start_field">Your name:</h3>
            <input type="text" class="name" size="20"></p>
            <h3 class="start_field">Your surname:</h3>
            <input type="text" class="name" size="20"></p>
            <h3 class="start_field">Your login:</h3>
            <input type="text" class="name" size="20"></p>
            <p><input type="button" class="send" value="Send">
            <input type="reset" class="clear" value="Clear"></p></form>
            <h3 class="item_start">How to play:</h3>
            <p>Memory is a counter game where the object is to find pairs.</p>
            <p>When the game begins, all pictures are hidden.</p>
            <h3 class="item_start">To play:</h3>
            <ul>
                <li>Select two cards to try to match the pictures.</li>
                <li>If you match the pictures you can go again.</li>
                <li>If they don't match it is the computer turn them.</li>
                <li>The player that finds all pairs wins!</li>
                <li>Have fun!</li>
            </ul>
        </div>`;
        this.difficulty = `
        <div class="difficulty item_start">
            <h3 class="item_start">Game difficulty</h3>
            <form class="diff_select item_start">
                <label>
                    <input type="radio" value="1" name="diff" checked>
                    <p>Low difficulty (3x2)</p>
                </label>
                <label>
                    <input type="radio" value="2" name="diff">
                   <p> Medium difficulty (4x3)</p>
                </label>
                <label>
                    <input type="radio" value="3" name="diff">
                   <p> Hard difficulty (5x4) </p>
                </label>
            </form>
        </div>`;
        this.cardback = `
        <div class="cardback item_start">
            <h3 class="item_start">Cardback</h3>    
            <form class="cardback_select">
                <label>
                    <input type="radio" value="1" name="cardback" checked>
                    <img src="img/card1.jpg" class="card-pic">
                </label>
                <label>
                    <input type="radio" name="cardback" value="2">
                    <img src="img/card2.jpg" class="card-pic">
                </label>
                <label>
                    <input type="radio" name="cardback" value="3">
                    <img src="img/card3.jpg" class="card-pic">
                </label>
            </form>
            
        </div>`;
        this.button = `<button class="start button">Start Game</button>`;
        
        this.difSel = 1;
        this.cardSel = 1;
        `<div><h1>Таблица лидеров</h1></div>`;
    }
    
    build() {
        function test() {
            var audio = document.createElement('audio');
            audio.setAttribute("autoplay", "true");
            audio.innerHTML = "<source src=\"audio/sound.mp3\" type=\"audio/mpeg\">";
            document.body.appendChild(audio);
        }
        gamebody.innerHTML = this.rules;
        gamebody.innerHTML += this.difficulty;
        gamebody.innerHTML += this.cardback;
        gamebody.innerHTML += this.button;
        test();
    }
    handle() {
        const formDiff = document.querySelector('.diff_select');
        const formCardback = document.querySelector('.cardback_select');
        const startGame = document.querySelector('.start');
        formDiff.addEventListener('click', (event) => {
            this.difSel = Number(event.target.value);
        });
        formCardback.addEventListener('click', (event) => {
            this.cardSel = Number(event.target.value);
        });
        startGame.addEventListener('click', (event) => {
            gamebody.innerHTML = '';
            const theGame = new Game(this.difSel, this.cardSel);
            theGame.init();
        })
    }

};