from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from keyboards import inline
import requests
from keyboards.inline import generate_wallet_keyboard
import json
import aiohttp
from aiogram.fsm.context import FSMContext
from utils.states import *

router = Router()

async def get_wallet_address(tgid):
    tgids = str(tgid)
    url = f"https://architecton.site/api/v1/account/tg/{tgids}"
    response = requests.get(url)
    data = json.loads(response.text)
    print(data)
    return data


@router.callback_query(F.data == "my_account")
async def my_account_menu(callback: CallbackQuery):
    wallet_data = await get_wallet_address(callback.message.chat.id)
    wallet_addresses = [address['address'] for address in wallet_data]
    keyboard = generate_wallet_keyboard(wallet_addresses)
    if callback.from_user.language_code == 'ru':
        await callback.message.edit_text(
            text="Выберите действие",
        reply_markup=inline.my_account
        )
    else:  
        await callback.message.edit_text(
            text="Choose an action",
            reply_markup=inline.my_account
        )
    
    
    
    
@router.callback_query(F.data == 'balance')
async def show_balance(callback: CallbackQuery, state: FSMContext):
    await state.set_state(UserWallet.address)
    wallet_data = await get_wallet_address(callback.message.chat.id)
    wallet_addresses = [address['address'] for address in wallet_data]
    keyboard = generate_wallet_keyboard(wallet_addresses)
    if callback.from_user.language_code == 'ru':
        await callback.message.edit_text(
            text="Пожалуйста, выберите кошелек",
            reply_markup=keyboard
        )
    else:
        await callback.message.edit_text(
            text="Please, choose the wallet",
            reply_markup=keyboard
        )
    
@router.callback_query(UserWallet.address)
async def balance_of_wallet(callback: CallbackQuery, state: FSMContext):
    if callback.data != "backone":
        await state.update_data(address=str(callback.data))
        dt = await state.get_data()
        address = dt.get('address')
        url = f"https://architecton.site/api/v1/bank/{str(address)}"
        response = requests.get(url)
        data = json.loads(response.text)
        if callback.from_user.language_code == 'ru':
            await callback.message.edit_text(
                text=f"Ваш баланс: {data['balance']['bankAmount']}\nМинтинг банков в час: {data['balance']['bnkPerHour']}",
                reply_markup=inline.my_account
            )    
            await state.clear()
        else:
            await callback.message.edit_text(
                text=f"Your balance: {data['balance']['bankAmount']}\nBank's minting per hour: {data['balance']['bnkPerHour']}",
                reply_markup=inline.my_account
            )    
            await state.clear()
    else:
        if callback.from_user.language_code == 'ru':
            await callback.message.edit_text(
                text="Выберите действие",
            reply_markup=inline.my_account
            )
            await state.clear()
        else:  
            await callback.message.edit_text(
                text="Choose an action",
                reply_markup=inline.my_account
            )
            await state.clear()
    
    
    
@router.callback_query(F.data == "friends")
async def friends_referrall(callback: CallbackQuery, state: FSMContext):
    await state.set_state(UserWallet.addresss)
    wallet_data = await get_wallet_address(callback.message.chat.id)
    wallet_addresses = [address['address'] for address in wallet_data]
    keyboard = generate_wallet_keyboard(wallet_addresses)
    if callback.from_user.language_code == 'ru':
        await callback.message.edit_text(
            text="Пожалуйста, выберите кошелек",
            reply_markup=keyboard
        )
    else:
        await callback.message.edit_text(
            text="Please, choose the wallet",
            reply_markup=keyboard
        )

@router.callback_query(UserWallet.addresss)
async def friends_of_wallet(callback: CallbackQuery, state: FSMContext):
    if callback.data != "backone":
        await state.update_data(addresss=str(callback.data))
        dt = await state.get_data()
        address = dt.get('addresss')
        url = f"https://architecton.site/api/v1/bank/{str(address)}/referral"
        response = requests.get(url)
        data = json.loads(response.text)
        if callback.from_user.language_code == 'ru':
            await callback.message.edit_text(
                text=f"Ваша реферальная ссылка принесла {data['refCount']} друзей\nВаша награда: {data['refBought']}",
                reply_markup=inline.my_account
            )
            await state.clear()
        else:
            await callback.message.edit_text(
                text=f"Your referral link brought in {data['refCount']} friends\nYour award: {data['refBought']}",
                reply_markup=inline.my_account
            )
            await state.clear()
    else:
        if callback.from_user.language_code == 'ru':
            await callback.message.edit_text(
                text="Выберите действие",
            reply_markup=inline.my_account
            )
            await state.clear()
        else:  
            await callback.message.edit_text(
                text="Choose an action",
                reply_markup=inline.my_account
            )
            await state.clear()
    
    
    
    
@router.callback_query(F.data == 'backone')
async def back_one(callback: CallbackQuery):
    if callback.from_user.language_code == 'ru':
        await callback.message.edit_text(
            text="Выберите действие",
            reply_markup=inline.my_account
        )
    else:  
        await callback.message.edit_text(
            text="Choose an action",
            reply_markup=inline.my_account
        )
            


# @router.callback_query(F.data == 'balance')
# async def show_balance(callback: CallbackQuery):
#     wallet_addresses = await get_wallet_address(callback.message.chat.id)
#     total_balance = 0
    
#     for wallet_address in wallet_addresses:
#         url = f"https://architecton.site/api/v1/bank/{str(wallet_address)}"
#         response = requests.get(url)
        
#         if response.status_code == 200:
#             data = json.loads(response.text)
#             total_balance += data['balance']['bankAmount']
    
#     await callback.message.edit_text(
#         text=f"Total balance across all wallets: {total_balance}",
#         reply_markup=inline.my_account
#     )

        
@router.callback_query(F.data == 'back')
async def back_button(callback: CallbackQuery):
    
    if callback.from_user.language_code == 'ru':
        await callback.message.edit_text(
            text="С возвращением!",
            reply_markup=inline.main
        )
    else:  
        await callback.message.edit_text(
            text="Welcome back!",
            reply_markup=inline.main
        )

