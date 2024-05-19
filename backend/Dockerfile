FROM python:3.12

RUN apt update && apt -y upgrade
# Setup OpenSSL
ARG OPENSSL_VERSION=1.1.1w
RUN wget https://www.openssl.org/source/openssl-${OPENSSL_VERSION}.tar.gz
RUN tar xvfz openssl-${OPENSSL_VERSION}.tar.gz
# Fix error `openssl: error while loading shared libraries: libssl.so.1.1: cannot open shared object file: No such file or directory`. Reference: https://github.com/openssl/openssl/issues/3993
RUN cd openssl-${OPENSSL_VERSION} && \
    ./config \
    --prefix=/usr/local \
    --libdir=/lib \
    --openssldir=/usr/local/ssl && \
    make && make install
# Add /usr/local/openssl/lib to /etc/ld.so.conf and then run the command `ldconfig`
RUN echo '/usr/local/ssl/lib' >> /etc/ld.so.conf
RUN cat /etc/ld.so.conf
RUN ldconfig
RUN echo 'export LD_LIBRARY_PATH=/usr/local/ssl/lib' >> ~/.bash_profile && . ~/.bash_profile
RUN openssl version


RUN pip install pipenv



WORKDIR /backend

COPY ./Pipfile ./Pipfile.lock ./

RUN pipenv requirements > requirements.txt
RUN pip install --user -r requirements.txt

COPY ./ ./

CMD python -m uvicorn architecton.app:app --host 0.0.0.0 --port 8000
