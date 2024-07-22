#FROM maven:3.8.5-openjdk-17-slim AS build
#WORKDIR /app
#COPY . .
#RUN mvn clean package -DskipTest
#
#FROM openjdk:17-slim
#COPY --from=build SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","/app.jar"]
FROM maven:3.8.5-openjdk-17-slim AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Copy the source code
COPY SWP/src ./src

# Run the Maven clean and package command
RUN mvn clean package -DskipTests

FROM openjdk:17-slim

# Copy the built JAR file from the build stage
COPY --from=build /app/target/SWP-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["java", "-jar", "/app.jar"]
