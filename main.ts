radio.onReceivedString(function (receivedString) {
    frequency = 1
    basic.showNumber(frequency)
    while (true) {
        if (input.buttonIsPressed(Button.AB)) {
            radio.setGroup(frequency)
            basic.clearScreen()
            basic.pause(1000)
            basic.showNumber(3)
            basic.pause(1000)
            basic.showNumber(2)
            basic.pause(1000)
            basic.showNumber(1)
            basic.pause(1000)
            basic.clearScreen()
            radio.sendValue("ready", 1)
            gameReady = true
            break;
        } else if (input.buttonIsPressed(Button.A)) {
            frequency += -1
            basic.showNumber(frequency)
        } else if (input.buttonIsPressed(Button.B)) {
            frequency += 1
            basic.showNumber(frequency)
        }
    }
    score1 = 0
    score2 = 0
})
radio.onReceivedValue(function (name, value) {
    if (name == "hand1str") {
        hand1 = value
    } else if (name == "hand2str") {
        hand2 = value
    } else if (name == "score1str") {
        score2 = value
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    isPlayer = true
})
let waiting = false
let isPlayer = false
let hand2 = 0
let hand1 = 0
let score2 = 0
let score1 = 0
let gameReady = false
let frequency = 0
basic.pause(100)
radio.sendString("pairing")
basic.forever(function () {
    waiting = false
    score1 = 0
    score2 = 0
    while (gameReady == true) {
        if (isPlayer == true) {
            if (input.isGesture(Gesture.Shake)) {
                hand1 = randint(1, 3)
                hand2 = randint(1, 3)
                radio.sendValue("hand1str", hand1)
                radio.sendValue("hand2str", hand2)
            }
            if (hand1 == 1) {
                basic.showIcon(IconNames.SmallSquare)
                basic.pause(100)
                basic.clearScreen()
            } else if (hand1 == 2) {
                basic.showIcon(IconNames.Square)
                basic.pause(100)
                basic.clearScreen()
            } else if (hand1 == 3) {
                basic.showIcon(IconNames.Scissors)
                basic.pause(100)
                basic.clearScreen()
            } else {
                basic.showIcon(IconNames.No)
            }
            if (waiting == false) {
                if (hand1 == 1 && hand2 == 3 || (hand1 == 2 && hand2 == 1 || hand1 == 3 && hand2 == 2)) {
                    score1 += 1
                    basic.showIcon(IconNames.Happy)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score1)
                    radio.sendValue("score1str", score1)
                    waiting = true
                } else if (hand1 == 1 && hand2 == 2 || (hand1 == 2 && hand2 == 3 || hand1 == 3 && hand2 == 1)) {
                    basic.showIcon(IconNames.Sad)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score1)
                    waiting = true
                } else if (hand1 == 1 && hand2 == 1 || (hand1 == 2 && hand2 == 2 || hand1 == 3 && hand2 == 3)) {
                    basic.showIcon(IconNames.No)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score1)
                    waiting = true
                }
            } else {
            	
            }
        } else if (isPlayer == false) {
            if (hand2 == 1) {
                basic.showIcon(IconNames.SmallSquare)
            } else if (hand2 == 2) {
                basic.showIcon(IconNames.Square)
            } else if (hand2 == 3) {
                basic.showIcon(IconNames.Scissors)
            } else {
                basic.showIcon(IconNames.No)
            }
            if (waiting == false) {
                if (hand1 == 1 && hand2 == 3 || (hand1 == 2 && hand2 == 1 || hand1 == 3 && hand2 == 2)) {
                    basic.showIcon(IconNames.Sad)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score2)
                    waiting = true
                } else if (hand1 == 1 && hand2 == 2 || (hand1 == 2 && hand2 == 3 || hand1 == 3 && hand2 == 1)) {
                    score2 += 1
                    basic.showIcon(IconNames.Happy)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score2)
                    radio.sendValue("score2str", score2)
                    waiting = true
                } else if (hand1 == 1 && hand2 == 1 || (hand1 == 2 && hand2 == 2 || hand1 == 3 && hand2 == 3)) {
                    basic.showIcon(IconNames.No)
                    basic.pause(100)
                    basic.clearScreen()
                    basic.showNumber(score2)
                    waiting = true
                }
            } else {
            	
            }
        }
    }
})
basic.forever(function () {
	
})
