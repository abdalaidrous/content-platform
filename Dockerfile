FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build && \
    echo "==== DIST TREE (up to 4 levels) ====" && \
    (find dist -maxdepth 4 -type f -print || true) && \
    (find dist -maxdepth 4 -type f -name 'main*.js' -print || true)

EXPOSE 3001

ENTRYPOINT [ "sh", "-c", "\
  set -e; \
  echo 'Starting API…'; \
  if [ -f dist/main.js ]; then \
    echo '-> Running dist/main.js'; exec node dist/main.js; \
  elif [ -f dist/src/main.js ]; then \
    echo '-> Running dist/src/main.js'; exec node dist/src/main.js; \
  else \
    CANDIDATE=$(find dist -maxdepth 4 -type f -name 'main*.js' | head -n1); \
    if [ -n \"$CANDIDATE\" ]; then \
      echo \"-> Running $CANDIDATE\"; exec node \"$CANDIDATE\"; \
    else \
      echo 'ERROR: No main*.js found under dist'; \
      echo 'Contents of dist:'; find dist -maxdepth 4 -type f -print || true; \
      exit 1; \
    fi; \
  fi \
" ]