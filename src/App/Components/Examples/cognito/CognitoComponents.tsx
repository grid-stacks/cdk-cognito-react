import React, { FC } from "react";
import Amplify, { Auth as CognitoAuth } from "aws-amplify";
import {
	AmplifyAuthenticator,
	AmplifySignIn,
	AmplifySignUp,
	AmplifySignOut,
	AmplifyForgotPassword,
	AmplifyGreetings,
	AmplifyTotpSetup,
} from "@aws-amplify/ui-react";

import { Auth } from "../config";

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: Auth.REGION,
		userPoolId: Auth.USER_POOL_ID,
		userPoolWebClientId: Auth.APP_CLIENT_ID,
		redirectSignIn: Auth.REDIRECT_SIGN_IN,
		redirectSignOut: Auth.REDIRECT_SIGN_OUT,
	},
});

const CognitoComponents: FC = () => {
	CognitoAuth.currentAuthenticatedUser()
		.then((user) => console.log({ user }))
		.catch((err) => console.log(err));
	CognitoAuth.currentSession()
		.then((session) => console.log({ session }))
		.catch((err) => console.log(err));

	return (
		<>
			<div>
				<h1>Cognito Authentication</h1>
				<hr />
				{/* <AmplifyTotpSetup />
				<AmplifyGreetings />
				<AmplifySignUp />
				<AmplifySignIn />
				<AmplifyForgotPassword /> */}
				<AmplifyAuthenticator>
					<AmplifySignOut />
					<p>
						Any content that needs authentication will be shown
						here.
					</p>
				</AmplifyAuthenticator>
			</div>
		</>
	);
};

export default CognitoComponents;
