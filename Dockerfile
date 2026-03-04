FROM python:3.12-slim

# Cài Lua + fix symlink + dependencies đầy đủ
RUN apt-get update && apt-get install -y \
    lua5.1 \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    ca-certificates \
    && ln -sf /usr/bin/lua5.1 /usr/bin/lua \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Cài Python packages
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "bot.py"]
