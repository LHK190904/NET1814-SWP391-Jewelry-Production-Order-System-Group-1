FROM maven:3.8.6-openjdk-17-slim AS build
WORKDIR /SWP/target
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTest

FROM openjdk:17-slim
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY --from=build SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]