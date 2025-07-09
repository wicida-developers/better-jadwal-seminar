FROM node:lts-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
ENV VITE_API_URL="VITE_API_URL_PLACEHOLDER"
RUN --mount=type=cache,id=pnpm,target=/pnpmb/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
CMD ["/entrypoint.sh"]
