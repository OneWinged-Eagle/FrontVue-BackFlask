FROM python:3.8.1

RUN mkdir /usr/src/api/
WORKDIR /usr/src/api/

COPY . .
RUN pip install -r requirements.txt

EXPOSE 4242

CMD [ "gunicorn", "-w", "4", "--bind", "0.0.0.0:4242", "wsgi:application"]
