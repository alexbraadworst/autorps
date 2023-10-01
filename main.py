def on_received_string(receivedString):
    global frequency, freqIsSet, gameReady, score1, score2
    frequency = 1
    basic.show_number(frequency)
    while True:
        if input.button_is_pressed(Button.AB):
            radio.set_group(frequency)
            basic.clear_screen()
            basic.pause(1000)
            basic.show_number(3)
            basic.pause(1000)
            basic.show_number(2)
            basic.pause(1000)
            basic.show_number(1)
            basic.pause(1000)
            basic.clear_screen()
            radio.send_value("ready", 1)
            freqIsSet = True
            gameReady = True
            break
        elif input.button_is_pressed(Button.A):
            frequency += -1
            basic.show_number(frequency)
        elif input.button_is_pressed(Button.B):
            frequency += 1
            basic.show_number(frequency)
    score1 = 0
    score2 = 0
radio.on_received_string(on_received_string)

def on_logo_pressed():
    global isPlayer
    isPlayer = 1
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

hand2 = 0
hand1 = 0
isPlayer = 0
score2 = 0
score1 = 0
gameReady = False
freqIsSet = False
frequency = 0
radio.send_string("pairing")

def on_forever():
    global hand1, hand2
    while gameReady == True:
        basic.show_number(isPlayer)
        if isPlayer == 1:
            if input.is_gesture(Gesture.SHAKE):
                hand1 = randint(1, 3)
                hand2 = randint(1, 3)
                radio.send_number(hand1)
                radio.send_number(hand2)
        if isPlayer == 0:
            hand1 = hand1
            hand2 = hand2
basic.forever(on_forever)
