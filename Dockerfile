FROM python:3.12-slim

# Cài đầy đủ dependencies hệ thống để pip install không lỗi
RUN apt-get update && apt-get install -y \
    lua5.1 \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "bot.py"]
