FROM python:3.12

RUN pip install pipenv

WORKDIR /SubCheckerBot
COPY ./Pipfile  ./
RUN pipenv lock
# COPY ./Pipfile ./Pipfile.lock ./
RUN pipenv requirements > requirements.txt
RUN pip install --user -r requirements.txt

COPY ./ ./

CMD python main.py
