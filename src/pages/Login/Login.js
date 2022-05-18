import React, { useContext, useEffect } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../partials/Loading';



const Login = () => {



    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [stateuser, stateloading] = useAuthState(auth)




    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (stateuser || user) {
            navigate("/")
        }
    }, [stateuser])

    let signInError;



    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }

    if (loading || stateloading) {
        return <Loading />
    }



    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-semibold text-center">Login</h2>

                    {/* react form hooks */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="input input-bordered w-full"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: {
                                        value: /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
                                        message: 'Enter valid Email address'
                                    }
                                })}
                            />
                            <label className="label">

                                {errors.email?.type === 'required' && <span className="text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="text-red-500">{errors.email.message}</span>}
                            </label>

                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                                {...register("password",
                                    {
                                        required: {
                                            value: true,
                                            message: "Password is Required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 Charecter long minimum'
                                        }
                                    }
                                )}
                            />
                            <label className="label">

                                {errors.password?.type === 'required' && <span className="text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500">{errors.password.message}</span>}
                            </label>


                        </div>



                        {signInError}

                        <input className="btn w-full" type="submit" value="Login" />
                    </form>
                    <p>
                        <small>New to Doctor's Portal? <Link className="text-secondary" to="/register">Create New Account</Link> </small>
                    </p>
                    {/* react form hooks */}

                    <div className="divider">OR</div>

                </div>
            </div>
        </div>
    );
};

export default Login;