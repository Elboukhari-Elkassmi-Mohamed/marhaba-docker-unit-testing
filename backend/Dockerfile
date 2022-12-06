FROM node:16.14.2

WORKDIR /backend

COPY package.json ./

RUN npm install

COPY . . 

ENV PORT=3001
ENV DATABASE_URL="mongodb+srv://monopoly:1995@cluster0.zx2byi3.mongodb.net/marhaba?retryWrites=true&w=majority"
# DATABASE_URL="mongodb://localhost:27017/marhaba"
ENV JWT_KEY = monopoly
ENV EMAIL = tkkt382@gmail.com
ENV PASSWORD = kdyuzldwpvvmfohx
ENV REACT_PORT=3000

EXPOSE 3001

CMD ["npm","start"]