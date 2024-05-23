import os.path

from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from keyboards import inline
from keyboards.inline import generate_wallet_keyboard
import json
import aiohttp
from aiogram.fsm.context import FSMContext
from utils.states import *
from config_reader import config

router = Router()

dir_path = os.path.dirname(__file__)


messages = {}
# Открываем соответствующий файл с сообщениями
with open(f"{dir_path}/messages_ru.json", "r", encoding="utf8") as f:
    messages["ru"] = json.load(f)
with open(f"{dir_path}/messages_en.json", "r", encoding="utf8") as f:
    messages["en"] = json.load(f)


async def get_wallet_address(tgid):
    tgids = str(tgid)
    url = f"https://architecton.site/api/v1/account/tg/{tgids}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
            print(data)
            return data


def get_message_from_file(key, language_code):
    # Извлекаем сообщение по ключу, если такой ключ есть
    if language_code in messages:
        return messages[language_code].get(key, None)
    else:
        return messages["en"].get(key, None)


@router.callback_query(F.data == "my_account")
async def my_account_menu(callback: CallbackQuery):
    await callback.message.edit_text(
        text=str(
            get_message_from_file(
                key="choose_action", language_code=callback.from_user.language_code
            )
        ),
        reply_markup=inline.my_account,
    )


@router.callback_query(F.data == "balance")
async def show_balance(callback: CallbackQuery, state: FSMContext):
    await state.set_state(UserWallet.address)
    wallet_data = await get_wallet_address(callback.message.chat.id)
    wallet_addresses = [address["address"] for address in wallet_data]
    keyboard = generate_wallet_keyboard(wallet_addresses)
    await callback.message.edit_text(
        text=str(
            get_message_from_file(
                key="choose_wallet", language_code=callback.from_user.language_code
            )
        ),
        reply_markup=keyboard,
    )


@router.callback_query(UserWallet.address)
async def balance_of_wallet(callback: CallbackQuery, state: FSMContext):
    if callback.data != "backone":
        await state.update_data(address=str(callback.data))
        dt = await state.get_data()
        address = dt.get("address")
        url = f"https://architecton.site/api/v1/bank/{str(address)}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
                balance = data["balance"]["bankAmount"]
                minting = data["balance"]["bnkPerHour"]
                await callback.message.edit_text(
                    text=str(
                        get_message_from_file(
                            key="your_balance",
                            language_code=callback.from_user.language_code,
                        )
                    ).format(balance, minting),
                    reply_markup=inline.my_account,
                )
                await state.clear()
    else:
        await callback.message.edit_text(
            text=str(
                get_message_from_file(
                    key="choose_action", language_code=callback.from_user.language_code
                )
            ),
            reply_markup=inline.my_account,
        )
        await state.clear()


@router.callback_query(F.data == "friends")
async def friends_referrall(callback: CallbackQuery, state: FSMContext):
    await state.set_state(UserWallet.addresss)
    wallet_data = await get_wallet_address(callback.message.chat.id)
    wallet_addresses = [address["address"] for address in wallet_data]
    keyboard = generate_wallet_keyboard(wallet_addresses)
    await callback.message.edit_text(
        text=str(
            get_message_from_file(
                key="choose_wallet", language_code=callback.from_user.language_code
            )
        ),
        reply_markup=keyboard,
    )


@router.callback_query(UserWallet.addresss)
async def friends_of_wallet(callback: CallbackQuery, state: FSMContext):
    if callback.data != "backone":
        await state.update_data(addresss=str(callback.data))
        dt = await state.get_data()
        address = dt.get("addresss")
        url = f"https://architecton.site/api/v1/bank/{str(address)}/referral"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
                refCount = data["refCount"]
                bankReward = data["bankReward"]
                await callback.message.edit_text(
                    text=str(
                        get_message_from_file(
                            key="referral_link",
                            language_code=callback.from_user.language_code,
                        )
                    ).format(refCount, bankReward),
                    reply_markup=inline.my_account,
                )
                await state.clear()
    else:
        await callback.message.edit_text(
            text=str(
                get_message_from_file(
                    key="choose_action", language_code=callback.from_user.language_code
                )
            ),
            reply_markup=inline.my_account,
        )
        await state.clear()


@router.callback_query(F.data == "backone")
async def back_one(callback: CallbackQuery):
    await callback.message.edit_text(
        text=str(
            get_message_from_file(
                key="choose_action", language_code=callback.from_user.language_code
            )
        ),
        reply_markup=inline.my_account,
    )


@router.callback_query(F.data == "back")
async def back_button(callback: CallbackQuery):
    await callback.message.edit_text(
        text=str(
            get_message_from_file(
                key="welcome_back", language_code=callback.from_user.language_code
            )
        ),
        reply_markup=inline.main,
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
