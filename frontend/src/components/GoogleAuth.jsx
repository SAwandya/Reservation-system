import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "130634797957-3nomoq3u697vsc0kpht36manaik0r5qm.apps.googleusercontent.com";

const GoogleAuth = () => {
  const onSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    // Send the token (credentialResponse.credential) to your backend for verification and authentication
  };

  const onFailure = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
