import readline from "readline";
import { IGameStates, StartGame } from "../state/gameState"
import { Room } from "./gameModel";

export default class Game {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    private state: IGameStates
    private currentStep = "start";

    constructor() {
        this.state = new StartGame(this)
    }

    setState(state: IGameStates) {
        this.state = state
    }

    startGame(): void {
        this.state.startGame()
    }
    
    gameInProicess(input: string): void {
        this.state.gameInProicess(input);
    }

    endGame(): void {
        this.state.endGame()
    }


    get CurrentStep(): string {
        return this.currentStep;
    }

    set CurrentStep(value: string) {
        this.currentStep = value
    }

    get Rl(){
        return this.rl
    }

    isStep(room: Room, normalizedInput: string): boolean {
        return room.steps.hasOwnProperty(normalizedInput)
    }
        
    isAction(room: Room, normalizedInput: string): boolean {
        return room.actions ? room.actions.hasOwnProperty(normalizedInput) : false
    }
}