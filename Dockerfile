FROM maven:3.8.5-openjdk-22 AS build
COPY . .
RUN mvn clean package -DskipTest

FROM openjdk:22
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
