FROM python:3.12

RUN pip install pipenv

WORKDIR /architecton

COPY ./Pipfile ./Pipfile.lock ./

RUN pipenv requirements > requirements.txt
RUN pip install --user -r requirements.txt

COPY ./architecton /architecton

CMD python -m uvicorn architecton.main:app --host 0.0.0.0 --port 8000
