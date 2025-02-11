import readline from "readline";
import {rooms, actions } from "../models/gameModel";
import gameView from "../views/gameView";
import { Room, RoomsType } from "../models/gameModel";
import { MoveCommand, ActionCommand } from "../commands/Commands";


export default class Cotnroller {
    // интерфейс для чтения ввода
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Текущее состояние игры
    currentStep = "start";
    currentAction = "";

    constructor() {
        // Начинаем игру при создании экземпляра
        this.startGame();
    }

    private startGame() {
        console.log("Привет! Как тебя зовут?");
        this.rl.once("line", (name) => {
        console.log(`Очень приятно, ${name}!`);
        gameView.displayStepList(rooms, this.currentStep)    
        this.rl.on("line", this.handleGameInput.bind(this)); // Переход к обработчику игры
        });
    }

    private handleGameInput(input: string) {
        const normalizedInput = input.toLowerCase();
    
      // Проверка на выход
        if (normalizedInput === "exit") {
            console.log("Программа завершена.");
            this.rl.close();
            return;
        }
    
        const room = rooms[this.currentStep];
        
        if(this.isStep(room, normalizedInput)){
            new MoveCommand(this, normalizedInput).execute();            
        } else if (this.isAction(room, normalizedInput)){
            new ActionCommand(this, normalizedInput).execute();
        } else {
            console.log("Неверное направление. Попробуйте снова.");
            gameView.displayAllRoomInfo(rooms, this.currentStep);
        }
    }

    private isStep(room: Room, normalizedInput: string): boolean {
        return room.steps.hasOwnProperty(normalizedInput)
    }
    
    private isAction(room: Room, normalizedInput: string): boolean {
        return room.actions ? room.actions.hasOwnProperty(normalizedInput) : false
    }
}


