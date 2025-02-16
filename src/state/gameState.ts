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
        console.log("Привет! Как тебя зовут?");
        this.game.Rl.once("line", (name) => {
        console.log(`Очень приятно, ${name}!`);
        gameView.displayStepList(rooms, this.game.CurrentStep);
        this.game.setState(new ProcessingGame(this.game));
        // this.game.Rl.on("line", this.game.handleGameInput.bind(this)); 
        });
    }

    gameInProicess(): void {

    }

    endGame(): void {

    }
}

class ProcessingGame implements IGameStates {
    private game: Game

    constructor (game: Game,) {
        this.game = game        
        this.game.Rl.on("line", this.game.gameInProicess.bind(this.game));
    }

    startGame(): void {
        console.log("Игра уже запущена");
    }

    gameInProicess (input: string): void {
        const normalizedInput = input.toLowerCase().trim();   

            if (normalizedInput === "exit") {
                new ExitCommand(this.game).execute();
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