## Github branching and CI CD
This project must have two branch always
# Pushing to master branch directly is prohibited must be pulled from staging.

# 1/ Master:- 
This branch will consist production code. Pull request to this branch will done necessary check to ensure it is ready to go for production and deployment.
Pushing to this master will check some automated deployment test and deploy it direct to the netlify.
Push to master will trigger deploymentAzure.yml
Pull to master will trigger development.yml

# 2/ Staging:-
This branch will consist development final code which have no bug, running in browser. This will also autometically tested. Master code will be pulled from here.

Pushing/ Pulling to this branch will trigger test.yml
