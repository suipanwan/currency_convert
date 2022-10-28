pipeline {
    agent any

    stages {
        stage('Verify') {
            steps {
              sh '''
                docker version
                docker info
                docker compose version
              '''
            }
        }
    }

    stages {
        stage('Build') {
            steps {
              echo 'Building..'
            }
        }
    }
}
