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

        stage('Build') {
            steps {
              echo 'Building..'
            }
        }
    }
}
