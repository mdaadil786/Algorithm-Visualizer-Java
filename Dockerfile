FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Fix permission + build in same layer (avoids cache issue)
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/algorithmvisualizer-0.0.1-SNAPSHOT.jar"]
