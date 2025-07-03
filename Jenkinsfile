pipeline {
    agent any

    environment {
        REGISTRY = 'lucas100'
        KUBECONFIG = credentials('kubeconfig')
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Check Tools') {
            steps {
                sh 'docker --version'
                sh 'mvn -v'
            }
        }

        stage('Clean Docker Resources') {
            steps {
                echo 'Cleaning Docker resources...'
                sh '''
                    docker stop $(docker ps -aq) || true
                    docker rm $(docker ps -aq) || true
                    docker rmi -f $(docker images -q) || true
                    docker volume prune -f || true
                '''
            }
        }

        stage('Build Microservices') {
            steps {
                echo 'Building microservices with Maven...'
                sh '''
                    for dir in backend/*; do
                        if [ -f "$dir/pom.xml" ]; then
                            echo "Building $dir"
                            cd "$dir"
                            mvn clean install
                            cd - > /dev/null
                        fi
                    done
                '''
            }
        }

        stage('Test Microservices') {
            steps {
                echo 'Running tests for microservices...'
                sh '''
                    for dir in backend/*; do
                        if [ -f "$dir/pom.xml" ]; then
                            echo "Testing $dir"
                            cd "$dir"
                            mvn test
                            cd - > /dev/null
                        fi
                    done
                '''
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                script {
                    def services = ['user-service', 'notification-service', 'analytics-service', 'ticket-service', 'route-service', 'schedule-service', 'frontend']
                    for (svc in services) {
                        sh "docker build -t ${REGISTRY}/${svc}:latest backend/${svc}"
                        sh "docker push ${REGISTRY}/${svc}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f k8s/'
                }
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
