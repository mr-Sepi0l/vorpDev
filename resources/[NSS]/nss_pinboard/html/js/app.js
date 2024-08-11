import {PinBoard} from "./Classes/PinBoard.js";
import {ClientMock} from "./Classes/ClientMock.js";

function isCitizenFX() {
    return navigator.userAgent.indexOf("CitizenFX") > -1
}

let pin_board;

if (isCitizenFX()) {
    pin_board = new PinBoard();
} else {
    pin_board = new PinBoard(ClientMock);
}
