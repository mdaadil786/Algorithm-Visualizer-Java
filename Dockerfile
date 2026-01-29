FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Fix: make mvnw executable (required on Linux/Render)
RUN chmod +x mvnw

# Build Spring Boot jar
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/algorithmvisualizer-0.0.1-SNAPSHOT.jar"]
