# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in setup.py
RUN pip install --no-cache-dir .

# Install MongoDB driver (pymongo)
RUN pip install --no-cache-dir pymongo

# Make port 5555 available to the world outside this container
EXPOSE 5555

# Set environment variables
ENV FLASK_APP=beergame
ENV FLASK_RUN_HOST=0.0.0.0

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=5555"]