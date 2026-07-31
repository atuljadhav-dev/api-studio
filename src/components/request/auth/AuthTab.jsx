import useRequestStore from "../../../store/requestStore";

import AuthTypeSelector from "./AuthTypeSelector";

import NoAuth from "./NoAuth";
import ApiKeyAuth from "./ApiKeyAuth";
import BearerAuth from "./BearerAuth";
import BasicAuth from "./BasicAuth";
import DigestAuth from "./DigestAuth";
import JwtAuth from "./JwtAuth";
import OAuth2Auth from "./OAuth2Auth";
import AwsSignatureAuth from "./AwsSignatureAuth";

export default function AuthTab() {

    const { selectedRequest } = useRequestStore();

    const type = selectedRequest.auth?.type || "none";

    return (
        <div className="flex h-full flex-col">

            <div className="border-b border-zinc-800 p-4">

                <AuthTypeSelector />

            </div>

            <div className="flex-1 overflow-auto p-6">

                {type === "none" && <NoAuth />}

                {type === "apikey" && <ApiKeyAuth />}

                {type === "bearer" && <BearerAuth />}

                {type === "basic" && <BasicAuth />}

                {type === "digest" && <DigestAuth />}

                {type === "jwt" && <JwtAuth />}

                {type === "oauth2" && <OAuth2Auth />}

                {type === "aws" && <AwsSignatureAuth />}

            </div>

        </div>
    );

}