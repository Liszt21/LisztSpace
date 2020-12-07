FROM python:3.8

WORKDIR /home/work/backend
COPY ./Pipfile ./Pipfile
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pipenv && pipenv install
VOLUME "/home/work/backend"
EXPOSE 5000

ENTRYPOINT [ "pipenv", "run" ]
CMD ["flask" "run"]
