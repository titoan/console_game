import Cotnroller from "../controllers/gameController";
import { rooms } from "../models/gameModel";


interface Command {
    execute(): void;
}

class MoveComand implements Command {
    controller: Cotnroller
    direction: string

    constructor(controller: Cotnroller, direction: string){
        this.controller = controller;
        this.direction = direction;
    }

    execute(): void {
        let room = rooms[this.controller.currentStep]
        this.controller.currentStep = room.steps[this.direction];
    }
}