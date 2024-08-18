FROM python:3.9-slim

WORKDIR /dashboard

COPY orm.py /dashboard/orm.py

# Install SQLite3
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python packages
RUN pip install pyserial

CMD ["python", "orm.py"] 
