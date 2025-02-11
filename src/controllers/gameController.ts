import readline from "readline";
import {rooms, actions } from "../models/gameModel";
import gameView from "../views/gameView";
import { Room, RoomsType } from "../models/gameModel";

export default class Cotnroller {
    // интерфейс для чтения ввода
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Текущее состояние игры
    currentStep = "start";

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
        let nextStep;    
        let roomAction;
    
        
        if(this.isStep(room, normalizedInput)){
            nextStep = room.steps[normalizedInput];
        } else if (this.isAction(room, normalizedInput)){
            roomAction = room.actions? room.actions[normalizedInput] : ""
        } else {
            console.log("Неверное направление. Попробуйте снова.");
            gameView.displayAllRoomInfo(rooms, this.currentStep);
        }
    
        if (nextStep) {
            this.currentStep = nextStep;
            gameView.displayAllRoomInfo(rooms, this.currentStep)
            console.log("\n(Введите 'exit' для завершения программы.)");
            nextStep = null
        } else {
            if (roomAction) {
                let currAction = actions[roomAction]
                gameView.displayChoosenAction(currAction);
                gameView.displayAllRoomInfo(rooms, this.currentStep)
                roomAction = null
            } 
        }
    }

    private isStep(room: Room, normalizedInput: string): boolean {
        return room.steps.hasOwnProperty(normalizedInput)
    }
    
    private isAction(room: Room, normalizedInput: string): boolean {
        return room.actions ? room.actions.hasOwnProperty(normalizedInput) : false
    }
}


