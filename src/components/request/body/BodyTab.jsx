import useRequestStore from "../../../store/requestStore";

import BodyTypeSelector from "./BodyTypeSelector";
import RawBody from "./RawBody";
import FormDataTab from "./FormDataTab";
import UrlEncodedTab from "./UrlEncodedTab";
import BinaryTab from "./BinaryTab";
import GraphQLTab from "./GraphQLTab";

export default function BodyTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const bodyType = selectedRequest.body?.type || "none";

	function setBodyType(type) {
		updateRequest(selectedRequest._id, {
			body: {
				...selectedRequest.body,
				type,
			},
		});
	}

	return (
		<div className='flex h-full flex-col'>
			<div className='border-b border-zinc-800 p-3'>
				<BodyTypeSelector value={bodyType} onChange={setBodyType} />
			</div>

			<div className='flex-1 overflow-hidden'>
				{bodyType === "none" && (
					<div className='flex h-full items-center justify-center text-zinc-500'>
						No Body
					</div>
				)}

				{bodyType === "raw" && <RawBody />}

				{bodyType === "form-data" && <FormDataTab />}

				{bodyType === "urlencoded" && <UrlEncodedTab />}

				{bodyType === "binary" && <BinaryTab />}

				{bodyType === "graphql" && <GraphQLTab />}
			</div>
		</div>
	);
}
