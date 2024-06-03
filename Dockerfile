FROM openjdk:22
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY SWP/target/SWP-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
