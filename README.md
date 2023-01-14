# CRUK Node.js Recruitment Assignment

### Functional Requirements

Build a service in Node.js that can be deployed to AWS which exposes an API and can be consumed from any client. 

This service should check how many donations a user has made and send them a special thank you message (e.g. via SNS) if they make 2 or more donations. 

**Overview**  
This application is developed using the AWS CDK, RDS and two lambda functions(in the resources directory). It does not utilise any VPS or authentication. The first lambda function is not internet exposed and is used to initialise the database with test data. The second function is exposed via lambda URLs and uses knex to query the RDS database for the donation count of a particular user.

**Assumptions made**
* The API expects the user's email to be sent. Since it is client agnostic, the email was chosen to avoid other personal information or database ids being sent.
* The API was designed to work with only one single user's information. The API can be used to check and trigger a thank you note to a SNS queue as soon as a particular user has made a donation. 

**Online URL for testing**  
https://ma37o7f26aefsmkfvzhl65zcje0sdlzy.lambda-url.us-east-1.on.aws/  
Request body is of content-type `application/json`
```
{
    "email":"testuser01@gmail.com"
}
```

**Deployment Instructions**
* Clone the repository.
* Install the dependences for both the cdk project and the donation lambda function
```
npm install
cd ./resources/donation-fn-code
npm install
```
* Head back to the root directory of the project and use the AWS CDK to deploy. Ensure that [aws-cli](https://aws.amazon.com/cli/) is installed and configured against the right region.
```
cdk bootstrap
cdk deploy
```

**Scalability**
* The app uses a lambda function and AWS should automatically handle scalability.
* As for RDS, the expectation would be to use as many read replicas as necessary since this function isn't writing back to the database.

**Tools for Monitoring**
* The metrics of the lambda function, cloud watch logs and log groups as well as building a custom dashboard. 

References Used:  
https://github.com/CRUKorg/cruk-backend-assignment  
https://aws.amazon.com/blogs/infrastructure-and-automation/use-aws-cdk-to-initialize-amazon-rds-instances/  
https://www.youtube.com/watch?v=1YrmUzOjIqE  
https://aws.amazon.com/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/  
https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html  
https://docs.aws.amazon.com/cdk/api/v1/docs/aws-lambda-readme.html  
