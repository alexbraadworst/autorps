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
            freqIsSet = true
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
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    isPlayer = true
})
let isPlayer = false
let hand2 = 0
let hand1 = 0
let score2 = 0
let score1 = 0
let gameReady = false
let freqIsSet = false
let frequency = 0
basic.pause(100)
radio.sendString("pairing")
basic.forever(function () {
    while (gameReady == true) {
        if (isPlayer == true) {
            if (hand1 == 1) {
                basic.showIcon(IconNames.SmallSquare)
            } else if (hand1 == 2) {
                basic.showIcon(IconNames.Square)
            } else if (hand1 == 3) {
                basic.showIcon(IconNames.Scissors)
            } else {
                basic.showIcon(IconNames.No)
            }
            if (input.isGesture(Gesture.Shake)) {
                hand1 = randint(1, 3)
                hand2 = randint(1, 3)
                radio.sendValue("hand1str", hand1)
                radio.sendValue("hand2str", hand2)
            }
            basic.showNumber(hand1)
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
            basic.showNumber(hand2)
        }
    }
})
basic.forever(function () {
	
})
