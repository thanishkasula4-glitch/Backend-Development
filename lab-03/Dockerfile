# ==============================================================================
# Dockerfile for Lab 3 - Render Cloud Deployment
# Solves SQLite GLIBC incompatibility by compiling from source on Debian Trixie
# ==============================================================================

FROM node:24-trixie-slim

# Set working directory
WORKDIR /app

# Install native compilation dependencies for node-gyp and sqlite3
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first for optimal Docker layer caching
COPY package*.json ./

# Force SQLite to compile from source against the container's GLIBC
RUN npm ci --omit=dev --build-from-source=sqlite3

# Verify SQLite native module loading and in-memory execution during build
RUN node -e "const sqlite3 = require('sqlite3'); console.log('SQLite native module loaded successfully')" && \
    node -e "const sqlite3 = require('sqlite3'); const db = new sqlite3.Database(':memory:'); db.serialize(() => { db.run('CREATE TABLE t (x INT)'); db.run('INSERT INTO t VALUES (1)'); db.get('SELECT x FROM t', (err, row) => { if (err || row.x !== 1) process.exit(1); console.log('SQLite in-memory test passed'); }); });" && \
    ldd ./node_modules/sqlite3/build/Release/node_sqlite3.node

# Copy application files (database.db, initDB.sql, app.js, etc.)
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose Render's default application port
EXPOSE 10000

# Start Express server
CMD ["npm", "start"]
