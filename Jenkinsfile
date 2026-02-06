pipeline {
    agent any

    environment {
        IMAGE_NAME = "alfitodangkuhono/front-end_bukpot"
        TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Branch') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/alfitoDangkuhono/convert-document-bukpot-frontend.git',
                    credentialsId: 'github-token'
            }
        }

        stage("Build Env File") {
            steps {
                withCredentials([file(credentialsId: 'new-credential-bukpot-fe', variable: 'ENV_FILE')]) {
                    script {
                        def envContent = readFile(env.ENV_FILE)
                        writeFile file: '.env', text: envContent
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build --no-cache -t $IMAGE_NAME:$TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME:$TAG
                    '''
                }
            }
        }

        stage('Deploy to Development server') {
            steps {
                sh '''
                  cd /opt/bukpot/frontend
                  docker compose -p app-bukpot-frontend down
                  docker compose pull
                  docker compose -p app-bukpot-frontend up -d
                '''
            }
        }
    }
    post{
        always {
            sh '''
               docker logout
            '''
        }
        success {
            echo '✅ Pipeline Success To Update Frontend Version Now: ${TAG}'
        }
        failure {
            echo '❌ pipeline failed'
        }
    }
}
