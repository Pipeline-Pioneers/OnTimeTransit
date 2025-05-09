FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar
COPY wait-for-it.sh .
ENTRYPOINT ["./wait-for-it.sh", "user-db:5432", "--", "java", "-jar", "app.jar"]

