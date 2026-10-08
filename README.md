Google Cloud Run is a fully managed serverless platform on Google Cloud that lets you run applications and APIs in containers without managing servers or Kubernetes clusters.



1. Create Artifact
    https://console.cloud.google.com/artifacts/create-repo?project=python-project-1st-sep

    asia-south2-docker.pkg.dev/python-project-1st-sep/artifact-simple-nodejs-project


2. Create the Docker images
    $ docker build -t simple-nodejs-projectt:1.0 .

	Run the docker image
	$ docker run --rm  -p 8000:8000 simple-nodejs-projectt:1.0

3. Get the Docker Images
	$ docker images    
    IMAGE                         ID             DISK USAGE   CONTENT SIZE   EXTRA
    simple-nodejs-projectt:1.0    4f9fd2efc26e        254MB         63.8MB  

4. Tag the image
    $  docker tag simple-nodejs-projectt:1.0 \
        asia-south2-docker.pkg.dev/python-project-1st-sep/artifact-simple-nodejs-project/simple-nodejs-projectt:1.0

5. Push the image
    docker push \
         asia-south2-docker.pkg.dev/python-project-1st-sep/artifact-simple-nodejs-project/simple-nodejs-projectt:1.0

    error from registry: Unauthenticated request. Unauthenticated requests do not have permission "artifactregistry.repositories.uploadArtifacts" on resource "projects/python-project-1st-sep/locations/asia-south2/repositories/artifact-simple-nodejs-project" (or it may not exist)

4. Verify the image
   $  gcloud artifacts docker images list \
        asia-south2-docker.pkg.dev/python-project-1st-sep/artifact-ai-python-weather-agent

5. Cloud Run UI
        https://console.cloud.google.com/run/overview?project=python-project-1st-sep

6. Cloud Run Command Line
   $ gcloud run deploy weather-api \
  --region asia-south1 \
  --allow-unauthenticated

    Deploying from source requires an Artifact Registry Docker repository to store 
    built containers. A repository named [cloud-run-source-deploy] in region 
    [asia-south1] will be created.

    Do you want to continue (Y/n)?  y

    Building using Dockerfile and deploying container to Cloud Run service [weather-api] in project [python-project-1st-sep] region [asia-south1]                                                    
    . Routing traffic...                                                         
    . Setting IAM Policy...                                                      
    Deployment failed                                                              
    ERROR: (gcloud.run.deploy) PERMISSION_DENIED: 

    ------------

    $ gcloud run deploy weather-api   --source .   --region asia-south1   --allow-unauthenticated
    ✓ Building and deploying ne                                                                    
    ✓ Setting IAM Policy...                                                      
    Done.                                                                          
    Service [weather-api] revision [weather-api-00001-kdb] has been deployed and is serving 100 percent of traffic.
    Service URL: https://weather-api-1040682241529.asia-south1.run.app


Note:
Unauthenticated requests do not have permission "artifactregistry.repositories.uploadArtifacts"

Permission already given [service-python-k8s@python-project-1st-sep.iam.gserviceaccount.com]
    Artifact Registry Repository Administrator
    Compute Admin
    Kubernetes Engine Admin
    Secret Manager Secret Accessor
    Service Account User
    Service Usage Admin

Issue:
    So Docker is not currently authenticated to Artifact Registry.

    Your service account has Artifact Registry Repository Administrator, which is sufficient for uploading artifacts. You need to authenticate Docker to asia-south2-docker.pkg.dev.


Solution:
1. Check which GCP identity is active

    gcloud auth list

    Also:
        gcloud config get-value project
        
        You should see:
        python-project-1st-sep

2. Configure Docker authentication
    Run:
        gcloud auth configure-docker asia-south2-docker.pkg.dev

    You should get something similar to:
        Adding credentials for: asia-south2-docker.pkg.dev

    Then retry:
    docker push \
         asia-south2-docker.pkg.dev/python-project-1st-sep/artifact-simple-nodejs-project/simple-nodejs-projectt:1.0

