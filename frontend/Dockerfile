# Stage 1: build the project
FROM node:22-alpine AS builder

WORKDIR /code

# copy package.json and install deps
COPY package*.json ./
RUN  npm install --legacy-peer-deps

# copy code and run build
COPY . .
RUN npm run build


# stage 2 : deploy the build files
FROM node:22-alpine AS runner
WORKDIR /code

ENV NODE_ENV=production

# copyy only the production output from builder stage
COPY --from=builder /code/.output ./.output

EXPOSE 3000


CMD ["node", ".output/server/index.mjs"]
