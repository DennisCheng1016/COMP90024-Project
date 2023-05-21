# Use an official Python runtime as a parent image
FROM python

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 8050 available to the world outside this container
EXPOSE 8050

# Run couchDB_test.py when the container launches
CMD ["python", "mastodon_front_end"]
