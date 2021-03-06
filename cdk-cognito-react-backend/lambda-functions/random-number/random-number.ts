export const handler = async (
	event: Record<string, unknown> = {}
): Promise<unknown> => {
	console.log(event);

	return {
		statusCode: 200,
		body: Math.random(),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
	};
};
