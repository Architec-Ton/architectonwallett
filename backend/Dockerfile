FROM python:3.12

RUN pip install pipenv

WORKDIR /architecton

COPY ./Pipfile ./Pipfile.lock

RUN pipenv install --system

COPY ./architecton /architecton

CMD python -m uvicorn architecton.main:app --host 0.0.0.0 --port 8000
