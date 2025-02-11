import {Room} from "../models/gameModel"
import { Action } from "../models/gameModel";

class View {
	displayStepList( room: {[key: string]: Room}, stepKey: string) {
		const currRoom = room[stepKey];
		console.log(`\n${currRoom.description}`);
		console.log("Выбери направление:");
		for (const direction in currRoom.steps) {
			console.log(` - ${direction}`);
		}
		
	}
	
	displayActionList( room: {[key: string]: Room}, stepKey: string ) {
		const currRoom = room[stepKey];
		if(currRoom.actions){
			console.log("Выбери действие:");		
			for (const action in currRoom.actions) {
				console.log(` - ${action}`);
			}
		}		
	}
	
	displayChoosenAction(roomAction: Action) {
		console.log(`\n${roomAction.description}`);
	}
	
	displayAllRoomInfo(room: {[key: string]: Room}, stepKey: string) {
		this.displayStepList(room, stepKey);		
		this.displayActionList(room, stepKey);
		
	}
}

const gameView = new View();
export default gameView;

