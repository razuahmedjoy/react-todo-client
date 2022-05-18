import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../../partials/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);


    const googleSignIn = ()=>{
        signInWithGoogle();
    }

    if(gloading){
        return <Loading />
    }


    return (
        <div>
            <button onClick={googleSignIn} class="btn btn-outline">Cotinue With Google</button>
        </div>
    );
};

export default SocialLogin;