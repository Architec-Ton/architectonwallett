import asyncio
import time

import aiohttp


async def get_balance(address, session):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"http://localhost:8000/api/v1/bank/{address}") as resp:
            if "x-process-time" in resp.headers:
                print("Time: ", resp.headers["x-process-time"])


async def main():
    # async with aiohttp.ClientSession() as session:
    tsk = []
    start_time = time.time()
    for i in range(100):
        tsk.append(
            get_balance("UQCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMNvA", 0)
        )  # "UQCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMNvA"

    await asyncio.gather(*tsk)

    print("Total time:", time.time() - start_time)


if __name__ == "__main__":
    asyncio.run(main())
