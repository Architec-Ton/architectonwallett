from aiogram.fsm.state import State, StatesGroup

class UserWallet(StatesGroup):
    address = State()
    addresss = State()

class Form(StatesGroup):
    password = State()
    message = State()
