#FROM maven:3.8.5-openjdk-17-slim
#WORKDIR /app
#COPY SWP/target/SWP-0.0.1-SNAPSHOT.jar /app/app.jar
#CMD ["java","-jar","/app/app.jar"]
# Use an official base image that allows for installing a custom JDK
FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get install -y wget gnupg2

# Install JDK 22 (if available) or a compatible version manually
RUN wget https://download.java.net/java/GA/jdk22/<version>/GPL/openjdk-22_linux-x64_bin.tar.gz \
    && tar -xzf openjdk-22_linux-x64_bin.tar.gz -C /usr/local \
    && rm openjdk-22_linux-x64_bin.tar.gz

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/local/jdk-22
ENV PATH $JAVA_HOME/bin:$PATH

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY target/my-app.jar /app/app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
