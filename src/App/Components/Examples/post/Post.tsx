import React, { FC } from "react";

import { useGetRandomNumberQuery } from "./post.slice";

const Post: FC = () => {
	const { data } = useGetRandomNumberQuery(2);

	console.log(data);

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (error) {
	// 	return <div>{error}</div>;
	// }

	return (
		<div>
			<h1>RTK Query</h1>
			<br />
			{/* Todo: {data && data.title} | Completed:{" "}
			{data && data.completed.toString()} */}
		</div>
	);
};

export default Post;
