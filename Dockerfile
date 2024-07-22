FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /build
COPY SWP/pom.xml .
COPY SWP/src /build
RUN mvn clean package -DskipTest

FROM openjdk:17-slim
COPY --from=build SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]