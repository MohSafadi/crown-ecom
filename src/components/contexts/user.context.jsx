import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


//this code is the context storage, it will initially take the default value, not the same as initial value.
//should be seen as the actual value you want to access
//we use null because its a falsey value and at some point we need to check if its truthy or falsy (empty string is truthy)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//any context that we build has a "Provider", the provider will be used to wrap around any component that we need to take value from 
// so we will use "UserProvider" to wrap the app component so we have access to the context storage everywhere in our app.

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //This is an open listener, its permanantly listens, We use useEffect because we only need to run it once
    //This code runs onMount first, it will track "Auth" changes from firebase.
    //It can either return "Null" if no user found or "user" object if user is found
    //Once the Auth changes, sign in and sign out will change the Auth Thats when this code runs again
    useEffect(() => {

        //We take the "user" as the "callback" for this function, and check if its found
        //if user is not "null" we will run "createUserDocum.." from firebase as well as "setCurrentUser" in context
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            };
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

//the "UserProvider" will be used to wrap the "App" component.
// UserContext will be used in sign in form to set the user after sign in, we can then use this value in Navigation component