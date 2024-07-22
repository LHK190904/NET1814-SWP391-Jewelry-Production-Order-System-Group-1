#FROM maven:3.8.5-openjdk-22 AS build
#COPY . .
#RUN mvn clean package -DskipTest
#
#FROM openjdk:22
#EXPOSE 8080
#ARG JAR_FILE=target/*.jar
#COPY SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
# Use the official Maven image to build the project
FROM maven:3.8.5-openjdk-22 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Use the official OpenJDK image to run the application
FROM openjdk:22
EXPOSE 8080

# Copy the JAR file from the build stage
COPY --from=build /app/target/SWP-0.0.1-SNAPSHOT.jar app.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app.jar"]
