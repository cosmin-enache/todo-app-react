import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import ListItemData from "../data-structures/list-item/list-item.data.js";

const config = CONFIG_DATA_HERE


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const registerUserInDatabase = async (userObject) => {
    if (!userObject) return;

    const { uid, displayName } = userObject;

    const userRef = firestore.doc(`/users/${uid}`);

    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
        try {
            await userRef.set({
                displayName
            });
        } catch (error) {
            console.log("Error!! => ", error.message);
        }

        try {
            const sampleListItem = ListItemData.toJSON(
                new ListItemData("Sample item!")
            );

            await userRef.collection("list-items").add(sampleListItem);
        } catch (error) {
            console.log("Error creating list-item collection!! => ", error.message);
        }
    }
};

export const registerListItemForUser = async (currentUserObject, item) => {
    if (!currentUserObject) return;

    const { uid } = currentUserObject;

    const itemCollectionRef = firestore.collection(`/users/${uid}/list-items/`);

    try {
        const itemSnapshot = await itemCollectionRef.add(ListItemData.toJSON(item));

        return itemSnapshot.id;
    } catch(error) {
        console.log("Error! =>", error.message);
    }

    return null
};

export const updateListItem = async (currentUserObject, itemId, updateValues) => {
    if (!currentUserObject) return;

    const { uid } = currentUserObject;

    const itemRef = firestore.doc(`/users/${uid}/list-items/${itemId}`);

    try {
        await itemRef.update(updateValues);
    } catch(error) {
        console.log("Error! => ", error.message);
    }
};

export const deleteListItem = async (currentUserObject, itemId) => {
    if (!currentUserObject) return;

    const { uid } = currentUserObject;

    const listItemRef = firestore.doc(`/users/${uid}/list-items/${itemId}`);

    try {
        await listItemRef.delete();
    } catch (error) {
        console.log("Error => ", error.message);
    }
};

export const retrieveUserListItems = async (userObject) => {
    if (!userObject) return;

    const { uid } = userObject;

    const listItemRef = firestore.collection(`/users/${uid}/list-items/`);

    const listItemAllSnapshots = await listItemRef.get();

    const itemArray = [];

    listItemAllSnapshots.forEach(snapshot => {
        const listItem = snapshot.data();
        listItem.id = snapshot.id;
        itemArray.push(listItem);
    });

    return itemArray;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
    await auth.signInWithPopup(provider);
    window.location.reload();
}

export default firebase;
