pipeline {
    agent none

    stages {
        stage('Verify') {
            agent{
              docker { image 'docker:20.10.20'}
            }
            steps {
              sh '''
                docker version
                docker info
                docker compose version
              '''
            }
        }

        stage('Build') {
            agent{
              docker { image 'node:19-alpine'}
            }
            steps {
              echo 'Building..'
            }
        }
    }
}
