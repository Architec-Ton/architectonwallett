from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from keyboards import inline
import requests
import json


router = Router()

async def get_wallet_address(tgid):
    tgids = str(tgid)
    url = f"https://architecton.site/api/v1/account/tg/{tgids}"
    response = requests.get(url)
    data = json.loads(response.text)
    print(data)
    if data[0]['address']:
        return data[0]['address']


@router.callback_query(F.data == "my_account")
async def my_account_menu(callback: CallbackQuery):
    await callback.message.edit_text(
        text="Choose the action",
        reply_markup=inline.my_account
    )
    
@router.callback_query(F.data == "friends")
async def friends_referrall(callback: CallbackQuery):
    wallet_address = await get_wallet_address(callback.message.chat.id)
    url = f"https://architecton.site/api/v1/bank/{str(wallet_address)}/referral"
    response = requests.get(url)
    data = json.loads(response.text)
    print(data)
    await callback.message.answer(
        text=f"Your referral link brought in {data['refCount']} friends\nYour award: {data['refBought']}",
        reply_markup=inline.my_account
    )


@router.callback_query(F.data == 'balance')
async def show_balance(callback: CallbackQuery):
    wallet_address = await get_wallet_address(callback.message.chat.id)
    url = f"https://architecton.site/api/v1/bank/{str(wallet_address)}"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        await callback.message.answer(
            text=f"Your balance: {data['balance']['bankAmount']}\nMinting per hour: {data['balance']['bnkPerHour']}", 
            reply_markup=inline.my_account
        )
    else:
        await callback.message.edit_text("You don't have a wallet. Register it in our Mini App!", reply_markup=inline.main)
        
@router.callback_query(F.data == 'back')
async def back_button(callback: CallbackQuery):
    await callback.message.edit_text(
        text=f"Welcome back",
        reply_markup=inline.main
    )
