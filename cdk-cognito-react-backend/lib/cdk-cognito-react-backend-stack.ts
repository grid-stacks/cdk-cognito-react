import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as api from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

export class CdkCognitoReactBackendStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Creating cognito user pool
		const userPool = new cognito.UserPool(this, "CdkCognitoReactUserPool", {
			userPoolName: "cdk-cognito-react-user-pool",
			selfSignUpEnabled: true,
			signInAliases: {
				username: true,
				email: true,
			},
			autoVerify: { email: true },
			signInCaseSensitive: false,
			customAttributes: {
				apiId: new cognito.StringAttribute({
					minLen: 1,
					maxLen: 256,
					mutable: true,
				}),
				joinedOn: new cognito.DateTimeAttribute(),
				plan: new cognito.StringAttribute({
					minLen: 1,
					maxLen: 256,
					mutable: true,
				}),
			},
			passwordPolicy: {
				minLength: 8,
				requireLowercase: true,
				requireUppercase: true,
				requireDigits: true,
				requireSymbols: true,
				tempPasswordValidity: cdk.Duration.days(3),
			},
			accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
		});

		// Cognito domain name for app
		userPool.addDomain("CdkCognitoReactUserPoolDomain", {
			cognitoDomain: {
				domainPrefix: "cdk-react-test",
			},
		});

		// New app client
		new cognito.UserPoolClient(this, "CdkCognitoReactUserPoolClient", {
			userPoolClientName: "cdk-cognito-react-frontend",
			userPool,
			generateSecret: false,
			authFlows: {
				adminUserPassword: true,
				userPassword: true,
				userSrp: true,
				custom: true,
			},
		});

		// Function that returns 200 with a random number
		const randomNumberFunction = new lambda.Function(
			this,
			"CdkCognitoReactLambdaRandomNumber",
			{
				code: new lambda.AssetCode("lambda-functions"),
				handler: "random-number.handler",
				runtime: lambda.Runtime.NODEJS_14_X,
			}
		);

		// Rest API backed by the randomNumberFunction
		const randomNumberFunctionRestApi = new api.LambdaRestApi(
			this,
			"CdkCognitoReactLambdaRandomNumberRestApi",
			{
				restApiName: "CDK Cognito React Random Number API",
				handler: randomNumberFunction,
				proxy: false,
			}
		);

		// Authorizer for the random number API that uses the
		// Cognito User pool to Authorize users.
		const authorizer = new api.CfnAuthorizer(
			this,
			"CdkCognitoReactLambdaRandomNumberRestApiAuth",
			{
				restApiId: randomNumberFunctionRestApi.restApiId,
				name: "randomNumberFunctionRestApiAuthorizer",
				type: "COGNITO_USER_POOLS",
				identitySource: "method.request.header.Authorization",
				providerArns: [userPool.userPoolArn],
			}
		);

		// Random number API path
		const randomNumber = randomNumberFunctionRestApi.root.addResource(
			"random_number"
		);

		// GET method for the random number API resource. It uses Cognito for
		// authorization and the authorizer defined above.
		randomNumber.addMethod(
			"GET",
			new api.LambdaIntegration(randomNumberFunction),
			{
				authorizationType: api.AuthorizationType.COGNITO,
				authorizer: {
					authorizerId: authorizer.ref,
				},
			}
		);
	}
}
