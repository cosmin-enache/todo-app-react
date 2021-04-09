import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils.js";

const OAuthContainer = () => {
    return (
        <div className="o-auth-container">
            <i
                className="fab fa-google o-auth-icon"
                onClick={ signInWithGoogle }
                />
        </div>
    );
};

export default OAuthContainer;
