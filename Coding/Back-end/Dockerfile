FROM maven:3.9.7-ibm-semeru-21-jammy AS build
LABEL authors="nguye"
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk
COPY --from=build /target/JewelryProduction-0.0.1-SNAPSHOT.jar JewelryProduction.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "JewelryProduction.jar"]