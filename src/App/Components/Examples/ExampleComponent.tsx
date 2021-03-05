import React, { FC } from "react";

import { Switch, Link } from "react-router-dom";

import Loadable from "../../../helpers/Loadable";
import ProtectedRouter from "../../../helpers/ProtectedRouter";
import AuthorizedRouter from "../../../helpers/AuthorizedRouter";

import ROUTER from "../../../consts/routers";

const FB = {
	fallback: <div>Loading...</div>,
};

const User = Loadable(() => import("./user/User"), FB);
const Count = Loadable(() => import("./count/Count"), FB);
const Post = Loadable(() => import("./post/Post"), FB);
const CognitoComponents = Loadable(
	() => import("./cognito/CognitoComponents"),
	FB
);

// const user = null;
const user = { name: "DHN Chandan" };

const ExampleComponent: FC = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to={ROUTER.COGNITO}>Cognito Authentication</Link>
				</li>
				<li>
					<Link to={ROUTER.USER}>User</Link>
				</li>
				<li>
					<Link to={ROUTER.COUNT}>Count</Link>
				</li>
				<li>
					<Link to={ROUTER.POST}>Post</Link>
				</li>
				<li>
					<Link to={ROUTER.LOGIN}>Login</Link>
				</li>
			</ul>
			<hr />
			<Switch>
				<ProtectedRouter user={user} path={ROUTER.COGNITO} exact>
					<CognitoComponents />
				</ProtectedRouter>
				<ProtectedRouter
					user={user}
					loginPath={ROUTER.LOGIN}
					path={ROUTER.USER}
					exact
				>
					<User />
				</ProtectedRouter>
				<ProtectedRouter user={user} path={ROUTER.COUNT} exact>
					<Count />
				</ProtectedRouter>
				<ProtectedRouter user={user} path={ROUTER.POST}>
					<Post />
				</ProtectedRouter>
				<AuthorizedRouter
					user={user}
					path={ROUTER.LOGIN}
					dashboardPath={ROUTER.DASHBOARD}
					exact
				>
					<div>
						<h1>Login</h1>
						<br />
						<p>
							Not yet registered?{" "}
							<Link to={ROUTER.REGISTER}>Register</Link>
						</p>
					</div>
				</AuthorizedRouter>
				<AuthorizedRouter
					user={user}
					path={ROUTER.REGISTER}
					dashboardPath={ROUTER.DASHBOARD}
				>
					<div>
						<h1>Register</h1>
						<br />
						<p>
							Already a member?{" "}
							<Link to={ROUTER.LOGIN}>Login</Link>
						</p>
					</div>
				</AuthorizedRouter>
			</Switch>
		</div>
	);
};

export default ExampleComponent;
