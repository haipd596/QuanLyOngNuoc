FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY be/package.json ./be/package.json
COPY be/prisma ./be/prisma
RUN npm ci --workspace be --include-workspace-root=false

FROM deps AS build
COPY be/tsconfig.json ./be/tsconfig.json
COPY be/tsconfig.build.json ./be/tsconfig.build.json
COPY be/nest-cli.json ./be/nest-cli.json
COPY be/src ./be/src
RUN npm run build --workspace be
RUN npm prune --omit=dev --workspace be --include-workspace-root=false

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/be/package.json ./be/package.json
COPY --from=build /app/be/dist ./be/dist
COPY --from=build /app/be/prisma ./be/prisma

WORKDIR /app/be
EXPOSE 3000
CMD ["node", "dist/main.js"]

