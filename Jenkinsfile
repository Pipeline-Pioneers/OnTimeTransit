pipeline {
    agent any

    environment {
        // Your env vars here if any
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/yourusername/your-repo.git', branch: 'main'
            }
        }

        stage('Clean Docker Resources') {
            steps {
                echo 'Cleaning Docker resources...'
                // Your cleaning commands here, e.g. sh 'docker system prune -f'
            }
        }

        stage('Build Microservices') {
            steps {
                echo 'Building microservices...'
                // Your build commands here, e.g. sh 'mvn clean package'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                // Your docker build commands here, e.g. sh 'docker build ...'
            }
        }

        stage('Deploy All Services') {
            steps {
                echo 'Deploying all services...'
                // Your deployment commands here, e.g. sh 'docker-compose up -d'
            }
        }
    }

    post {
        failure {
            echo '❌ Build or deployment failed!'
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
    }
}
