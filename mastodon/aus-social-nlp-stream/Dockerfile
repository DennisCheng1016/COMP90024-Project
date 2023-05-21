# Use an official Python runtime as a parent image
FROM python:3.11.3-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Update and upgrade all packages, then install python3 and python3-pip
RUN apt-get update && apt-get upgrade -y && apt-get install -y python3 python3-pip

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org couchdb mastodon.py beautifulsoup4 transformers torch

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run couchDB_test.py when the container launches
CMD ["python", "main.py"]
