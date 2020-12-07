FROM node

WORKDIR /home/work/frontend
COPY ./ /home/work/frontend
ENV CHOKIDAR_USEPOLLING=true 
RUN yarn install --registry https://registry.npm.taobao.org/

VOLUME "/home/work/frontend/src"
ENTRYPOINT [ "yarn" ]
CMD ["start"]
