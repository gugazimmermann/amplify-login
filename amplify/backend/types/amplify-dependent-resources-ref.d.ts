export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "amplifyloginAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "hosting": {
        "S3AndCloudFront": {
            "Region": "string",
            "HostingBucketName": "string",
            "WebsiteURL": "string",
            "S3BucketSecureURL": "string",
            "CloudFrontDistributionID": "string",
            "CloudFrontDomainName": "string",
            "CloudFrontSecureURL": "string",
            "CloudFrontOriginAccessIdentity": "string"
        }
    },
    "function": {
        "amplifyloginAuthCustomMessage": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    },
    "api": {
        "amplifylogin": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "predictions": {
        "faceID": {
            "region": "string",
            "celebrityDetectionEnabled": "string",
            "maxEntities": "string"
        }
    }
}