FROM python:3.12

RUN apt-get update && apt-get install -y \
    lua5.1 \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    rustc \
    cargo \
    zlib1g-dev \
    libjpeg-dev \
    && ln -sf /usr/bin/lua5.1 /usr/bin/lua \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

# update pip trước cho chắc
RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "bot.py"]
