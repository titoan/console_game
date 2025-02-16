import Game from "../models/gameClass";
import { rooms, actions } from "../models/gameModel";
import gameView from "../views/gameView";

interface Command {
    execute(): void;
}

export class MoveCommand implements Command {
    game: Game
    direction: string

    constructor(game: Game, direction: string){
        this.game = game;
        this.direction = direction;
    }

    execute(): void {
        let room = rooms[this.game.CurrentStep]
        this.game.CurrentStep = room.steps[this.direction];
        gameView.displayAllRoomInfo(rooms, this.game.CurrentStep)
        console.log("\n(Введите 'exit' для завершения программы.)");
    }
}

export class ActionCommand implements Command {
    private game: Game
    private action: string

    constructor(game: Game, action: string) {
        this.game = game;
        this.action = action;
    }

    execute(): void {
        let room = rooms[this.game.CurrentStep]
        let currAction = actions[room.actions[this.action]]
        gameView.displayChoosenAction(currAction);
        gameView.displayAllRoomInfo(rooms, this.game.CurrentStep);
        console.log("\n(Введите 'exit' для завершения программы.)");
    }
}

export class ExitCommand implements Command {
    private game: Game    

    constructor(game: Game){
        this.game = game;
    }

    execute(): void {
        console.log("Программа завершена.");
        this.game.Rl.close();
        return;
    }
}