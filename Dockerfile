# Alrayhan Sales — Docker image
# Node 20 LTS on Alpine; the app has no npm dependencies, so no install step is needed.
FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=3000 \
    TZ=Asia/Baghdad

WORKDIR /app

# App code (the data/ folder is excluded by .dockerignore and lives in a volume instead)
COPY --chown=node:node alrayhan-sales/ ./

# Database + daily backups live here; mount a volume on it so they survive rebuilds
RUN mkdir -p /app/data && chown node:node /app/data
VOLUME ["/app/data"]

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/',r=>process.exit(r.statusCode<400?0:1)).on('error',()=>process.exit(1))"]

CMD ["node", "server.js"]
