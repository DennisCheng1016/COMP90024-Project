# Use an official Python runtime as a parent image
FROM python

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org couchdb mastodon.py

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run couchDB_test.py when the container launches
CMD ["python", "aus-social-stream.py"]
