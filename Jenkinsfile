pipeline {
    agent any

    stages {
        stage('Build image') {
            steps {
                echo 'Starting to build docker image DB'
                script {
                    def DB = docker.build("cc_api:${env.BUILD_ID}","./api")
                    def php = docker.build("cc_tg_bot:${env.BUILD_ID}","./tg_bot") 
                }
            }
        }
    }
}
