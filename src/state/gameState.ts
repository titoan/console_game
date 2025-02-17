import Game from "../models/gameClass";
import gameView from "../views/gameView";
import { rooms } from "../models/gameModel";
import { ExitCommand, MoveCommand, ActionCommand } from "../commands/Commands";

export interface IGameStates {
    startGame(): void,
    gameInProicess(input: string): void,
    endGame(): void
}

export class StartGame implements IGameStates {
    private game: Game

    constructor (game: Game) {
        this.game = game;
        this.startGame();
    }

    startGame(): void {
        this.game.CurrentStep = "start";
        console.log("Привет! Как тебя зовут?");
        this.game.Rl.once("line", (name) => {
        console.log(`Очень приятно, ${name}!`);
        gameView.displayStepList(rooms, this.game.CurrentStep);        
        this.gameInProicess()
        });
    }

    gameInProicess(): void {
        this.game.setState(new ProcessingGame(this.game));
        // console.log("Игра ещё не началась")
    }

    endGame(): void {

    }
}

class ProcessingGame implements IGameStates {
    private game: Game

    constructor (game: Game,) {
        this.game = game;
        this.game.Rl.removeAllListeners("line")
        this.game.Rl.on("line", this.game.gameInProicess.bind(this.game));
    }

    startGame(): void {
        console.log("Игра уже запущена");
    }

    gameInProicess (input: string): void {
        const normalizedInput = input.toLowerCase().trim();   

            if (normalizedInput === "exit") {
                this.game.setState(new EndGame(this.game));
            } else {
                const room = rooms[this.game.CurrentStep];
            
                if(this.game.isStep(room, normalizedInput)){
                    new MoveCommand(this.game, normalizedInput).execute();            
                } else if (this.game.isAction(room, normalizedInput)){
                    new ActionCommand(this.game, normalizedInput).execute();
                } else {
                    console.log("Неверное направление. Попробуйте снова.");
                    gameView.displayAllRoomInfo(rooms, this.game.CurrentStep);
                }
            }
    }

    endGame(): void {

    }
}

class EndGame implements IGameStates {
    private game: Game

    constructor (game: Game) {
        this.game = game;
        console.log("Вы звершили игру. Для выхода из программы введите команду 'exit' ")
        console.log("Для того, чтобы начать новую игру введите команду 'start' ")
        this.game.Rl.removeAllListeners("line")
        this.game.Rl.on("line", this.game.gameInProicess.bind(this.game));
    }

    startGame(): void {
        this.game.setState(new StartGame(this.game));
    }

    gameInProicess(input: string): void {
        const normalizedInput = input.toLowerCase().trim();

        if (normalizedInput === "start") {
            this.game.Rl.removeAllListeners("line")
            this.startGame(); 
        } else if (normalizedInput === "exit") {
            this.endGame(); 
        } else {
            console.log("Неизвестная команда. Введите 'start' для новой игры или 'exit' для выхода.");
        }
    }

    endGame(): void {
        new ExitCommand(this.game).execute();
    }
}
