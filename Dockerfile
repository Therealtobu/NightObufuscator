FROM python:3.12-slim

# Cài Lua 5.1 (bắt buộc cho Hercules)
RUN apt-get update && apt-get install -y lua5.1 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "bot.py"]
