import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";

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
	}
}
