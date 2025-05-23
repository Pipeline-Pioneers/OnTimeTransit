pipeline {
    agent any

    options {
        timestamps()
        ansiColor('xterm')
    }

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Docker Resources') {
            steps {
                echo '🧹 Cleaning old Docker containers and images...'
                sh '''
                    docker compose down --remove-orphans
                    docker system prune -f
                '''
            }
        }

        stage('Build Microservices') {
            steps {
                script {
                    def services = ['user-service', 'notification-service', 'analytics-service', 'ticket-service', 'route-service', 'schedule-service']
                    for (svc in services) {
                        dir("backend/${svc}") {
                            echo "🔨 Building ${svc}"
                            sh 'mvn clean package -DskipTests'
                        }
                    }
                }
            }
        }

        // Optional: Uncomment to run tests
        // stage('Run Unit Tests') {
        //     steps {
        //         script {
        //             def services = ['user-service', 'notification-service', 'analytics-service', 'ticket-service', 'route-service', 'schedule-service']
        //             for (svc in services) {
        //                 dir("backend/${svc}") {
        //                     echo "🧪 Testing ${svc}"
        //                     sh 'mvn test'
        //                 }
        //             }
        //         }
        //     }
        // }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy All Services') {
            steps {
                echo '🚀 Deploying services...'
                sh 'docker compose up -d --force-recreate'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Build or deployment failed!'
        }
    }
}
