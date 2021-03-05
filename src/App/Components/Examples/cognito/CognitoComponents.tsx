import React, { FC } from "react";
import Amplify, { Auth as CognitoAuth } from "aws-amplify";
import {
	AmplifyAuthenticator,
	AmplifySignOut,
	// AmplifySignIn,
	// AmplifySignUp,
	// AmplifyForgotPassword,
	// AmplifyGreetings,
	// AmplifyTotpSetup,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

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
	const [authState, setAuthState] = React.useState<AuthState>();
	const [user, setUser] = React.useState<
		Record<string, unknown> | undefined
	>();

	React.useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData as Record<string, unknown>);
		});
	}, []);

	CognitoAuth.currentAuthenticatedUser()
		.then((user) => console.log({ user }))
		.catch((err) => console.log(err));
	CognitoAuth.currentSession()
		.then((session) => console.log({ session }))
		.catch((err) => console.log(err));

	return authState === AuthState.SignedIn && user ? (
		<div className="App">
			<div>Hello, {user.username}</div>
			<AmplifySignOut />
		</div>
	) : (
		<AmplifyAuthenticator />
	);

	// return (
	// 	<>
	// 		<div>
	// 			<h1>Cognito Authentication</h1>
	// 			<hr />
	// 			{/* <AmplifyTotpSetup />
	// 			<AmplifyGreetings />
	// 			<AmplifySignUp />
	// 			<AmplifySignIn />
	// 			<AmplifyForgotPassword /> */}
	// 			<AmplifyAuthenticator>
	// 				<AmplifySignOut />
	// 				<p>
	// 					Any content that needs authentication will be shown
	// 					here.
	// 				</p>
	// 			</AmplifyAuthenticator>
	// 		</div>
	// 	</>
	// );
};

export default CognitoComponents;
