# Use Ubuntu as the builder stage
FROM ubuntu:latest AS builder

# Install dependencies (Java, Maven, Git)
RUN apt update && apt install -y openjdk-17-jdk maven git curl

# Set the working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the project using Maven
RUN mvn clean package -DskipTests

# Use a minimal Ubuntu image for production
FROM ubuntu:latest
WORKDIR /app

# Install Java (no need for Maven in production)
RUN apt update && apt install -y openjdk-17-jdk

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the backend port
EXPOSE 8081

# Start the Spring Boot application
CMD ["java", "-jar", "app.jar"]



