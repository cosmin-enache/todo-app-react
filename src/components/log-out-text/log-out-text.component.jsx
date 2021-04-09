import React from "react";
import { auth } from "../../firebase/firebase.utils.js";

const LogOutText = () => (
    <a
        onClick={ async () => { await auth.signOut(); window.location.reload() } }
        >
        { auth.currentUser.displayName } - <span className="custom-link">Log out</span>
    </a>
);

export default LogOutText;
