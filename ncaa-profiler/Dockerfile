FROM python:3.9

# Set the working directory for your application
WORKDIR /app

# Copy the requirements.txt to the /app directory
COPY ./app/requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy all Python files from your local directory to /app in the container
COPY ./app /app/


# Set the command to run the FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "89", "--reload", "--log-level", "debug"]