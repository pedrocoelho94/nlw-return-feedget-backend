yarn init -y
yarn add typescript @types/node ts-node-dev -D
npx tsc --init

npx tsc
npx prisma init
npx prisma migrate dev => criar as tabelas depois de escrever no schema (dev => desenvolvimento)
npx prisma migrate deploy

npx prisma studio => ver as tabelas

yarn add jest -D
npx jest --init
yarn add ts-node -D
yarn add @swc/core @swc/jest -D