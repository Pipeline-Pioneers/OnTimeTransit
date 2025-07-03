FROM jenkins/jenkins:lts

USER root

# Install Docker CLI & Maven
RUN apt-get update && \
    apt-get install -y docker.io maven && \
    usermod -aG docker jenkins

# Optional: clean up to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER jenkins
