FROM node:18-alpine AS builder
# This will support to use yarn3
# RUN npm install -g yarn@3.6.4

WORKDIR /monorepo
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN yarn install

COPY packages/web ./web
COPY packages/shared ./shared

RUN yarn web:build

FROM node:18-alpine AS runner

WORKDIR /monorepo

COPY --from=builder /monorepo/packages/web/next.config.js ./
COPY --from=builder /monorepo/packages/web/public ./public
COPY --from=builder /monorepo/packages/web/.next ./.next
COPY --from=builder /monorepo/packages/web/package*.json ./
COPY --from=builder /monorepo/node_modules ./node_modules
COPY --from=builder /monorepo/packages/shared/dist ./packages/shared/dist

EXPOSE 3000

CMD ["yarn", "start"]