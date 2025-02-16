import readline from "readline";
import {rooms, actions } from "../models/gameModel";
import gameView from "../views/gameView";
import { Room, RoomsType } from "../models/gameModel";
import { MoveCommand, ActionCommand, ExitCommand } from "../commands/Commands";
import Game from "../models/gameClass";


export default class Cotnroller {    
    
    constructor() {
        new Game().startGame;
    }
    
}