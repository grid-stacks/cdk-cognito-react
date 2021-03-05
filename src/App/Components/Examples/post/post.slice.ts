import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

// Define a service using a base URL and expected endpoints
export const jsonPlaceholder = createApi({
	reducerPath: "jsonPlaceholder",
	baseQuery: fetchBaseQuery({
		// baseUrl: "https://jsonplaceholder.typicode.com/",
		baseUrl: "https://ta6ixp5aoc.execute-api.us-east-1.amazonaws.com/prod/",
		prepareHeaders: (headers) => {
			headers.set(
				"Authorization",
				"eyJraWQiOiJRQ25pVk5xSTRLUzgzUGtcL05WUVFUMkcxdE9HV05ac0F1SXJOa0RMcENCdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjZTUyNjg2OC0zZmM5LTQzY2YtODYzMS01YzMyZjMzNDVlZGMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNkNxNjJ4WUFuIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmFwaUlkIjoiNTRmZ3R5NTYiLCJjb2duaXRvOnVzZXJuYW1lIjoiZGhuY2hhbmRhbiIsImF1ZCI6IjQ5c3J0ODYyMnNobjgybm5ncHAwb3NqMWRoIiwiZXZlbnRfaWQiOiIyNjVmOTg2ZC1mOGJiLTQ0ZTctYTUyMi03MjAxNDQwZDk3NGQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYxNDk4MjYzOSwicGhvbmVfbnVtYmVyIjoiKzEwMTcxMzQxMzQzMSIsImV4cCI6MTYxNDk4NjIzOSwiaWF0IjoxNjE0OTgyNjM5LCJlbWFpbCI6InBocC5jaGFuZGFuQGdtYWlsLmNvbSJ9.O6Utik5gKO1D-yqtsveW6cs3o9cUnoJpCUL4NiGdaTDG_ZOxpr1QtaIsQ0K2uozSH1FT7to6N_OE_pwEv_ghSGWLVhE0Tjmvy49T6jYhvADd8MeFJL_DxWdzr6A2vbhA1xYUo4Ft-sAWKu26zAY_y8MFyV6wgy9UFKHbs6WjO9aciTfHaKZtGEdIOYgn7QZ0_ydiUXO3am-KqurpeTwzIGVSqqVPoDyYJ-1n4cfod0zxk2nyBgRSEmdPq_UG2KPhUs38BBz7iKgYSMYQLBSFYVzX975P-z_N1xy8wTi9C7C-pxaNeJFGwzgq7PC61q2Z1lZN7Dxbbag4j29H4DH1Xg"
			);
			// headers.set("Access-Control-Allow-Origin", "*");
			headers.set("Content-Type", "application/json");
			// headers.set("x-api-key", "*");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "todos",
		}),
		getTodo: builder.query({
			query: (id: number) => `todos/${id}`,
		}),
		getRandomNumber: builder.query({
			query: () => "random-number",
		}),
	}),
});

export const {
	useGetTodosQuery,
	useGetTodoQuery,
	useGetRandomNumberQuery,
} = jsonPlaceholder;
