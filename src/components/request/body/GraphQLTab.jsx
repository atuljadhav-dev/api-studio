import Editor from "@monaco-editor/react";
import useRequestStore from "../../../store/requestStore";

export default function GraphQLTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const graphql = selectedRequest.body?.graphql || {};

	return (
		<div className='flex h-full flex-col'>
			<div className='border-b border-zinc-800 p-3 text-sm text-zinc-400'>
				Query
			</div>
			<div className='h-1/2 min-h-0'>
				<Editor
					height='100%'
					language='graphql'
					theme='vs-dark'
					value={graphql.query || ""}
					onChange={(value) =>
						updateRequest(selectedRequest._id, {
							body: {
								...selectedRequest.body,
								graphql: {
									...graphql,
									query: value || "",
								},
							},
						})
					}
					options={{
						minimap: { enabled: false },
					}}
				/>
			</div>
			<div className='border-y border-zinc-800 p-3 text-sm text-zinc-400'>
				Variables
			</div>
			<div className='h-1/2 min-h-0'>
				<Editor
					height='100%'
					language='json'
					theme='vs-dark'
					value={graphql.variables || "{}"}
					onChange={(value) =>
						updateRequest(selectedRequest._id, {
							body: {
								...selectedRequest.body,
								graphql: {
									...graphql,
									variables: value || "{}",
								},
							},
						})
					}
					options={{
						minimap: { enabled: false },
					}}
				/>
			</div>
		</div>
	);
}
