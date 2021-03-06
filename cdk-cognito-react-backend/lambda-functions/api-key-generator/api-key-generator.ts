// eslint-disable-next-line @typescript-eslint/no-var-requires
import { APIGateway, CognitoIdentityServiceProvider } from "aws-sdk";

const API = new APIGateway({ region: "us-east-1" });
const cognito = new CognitoIdentityServiceProvider({ region: "us-east-1" });

const generateApiKey = async (sub: string) => {
	return await new Promise((resolve, reject) => {
		const params = {
			name: `cdk-cognito-react-${sub}`,
			generateDistinctId: true,
			enabled: true,
			stageKeys: [
				{
					restApiId: "ta6ixp5aoc",
					stageName: "prod",
				},
			],
		};

		API.createApiKey(params, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

const saveApiKey = async (username: string, apiKey: string) => {
	return await new Promise((resolve, reject) => {
		const params = {
			UserAttributes: [
				{
					Name: "custom:apiId",
					Value: apiKey,
				},
			],
			Username: username,
			UserPoolId: "us-east-1_6Cq62xYAn",
		};

		cognito.adminUpdateUserAttributes(params, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

const addKeyToPlan = async (keyId: string) => {
	return await new Promise((resolve, reject) => {
		const params = {
			keyId,
			keyType: "API_KEY",
			usagePlanId: "zbpj8y",
		};

		API.createUsagePlanKey(params, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

interface IEvent {
	triggerSource: string;
	request: Record<string, Record<string, string | boolean | Date | number>>;
	username: string;
	userPoolId: string;
	region: string;
	callerContext: Record<string, string>;
	response: Record<string, string | boolean | Date | number>;
}

export const handler = async (event: IEvent): Promise<IEvent> => {
	console.log({ event });

	if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
		const attr = event.request.userAttributes;

		const key: any = await generateApiKey(attr.sub as string);

		await addKeyToPlan(key.id);
		await saveApiKey(event.username, key.value);
	}

	return event;
};
