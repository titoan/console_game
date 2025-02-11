import Cotnroller from "../controllers/gameController";
import { rooms, actions } from "../models/gameModel";
import gameView from "../views/gameView";

interface Command {
    execute(): void;
}

export class MoveCommand implements Command {
    controller: Cotnroller
    direction: string

    constructor(controller: Cotnroller, direction: string){
        this.controller = controller;
        this.direction = direction;
    }

    execute(): void {
        let room = rooms[this.controller.currentStep]
        this.controller.currentStep = room.steps[this.direction];
        gameView.displayAllRoomInfo(rooms, this.controller.currentStep)
        console.log("\n(Введите 'exit' для завершения программы.)");
    }
}

export class ActionCommand implements Command {
    private controller: Cotnroller
    private action: string

    constructor(controller: Cotnroller, action: string) {
        this.controller = controller;
        this.action = action;
    }

    execute(): void {
        let room = rooms[this.controller.currentStep]
        let action = actions[room.actions[this.action]]
        gameView.displayChoosenAction(action);
        gameView.displayAllRoomInfo(rooms, this.controller.currentStep);
        console.log("\n(Введите 'exit' для завершения программы.)");
    }

}

// ! при помощи команд управлять состояние контроллера. Вот так всё просто оказывается. 