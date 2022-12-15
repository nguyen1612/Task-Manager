import {useState} from 'react';

import { Input, InputPass } from './utils';


const data_init = {
    input: {
        Username: {txt: '', warn: false},
        Password: {txt: '', warn: false},
        "Confirm Password": {txt: '', warn: false},
        Email: {txt: '', warn: false}
    },

    isSignIn: true,
    allowSubmit: false,
    submitted: false,
}
const warn = {
    Username: 'Your username must be between 6 to 30 characters.',
    Password: 'Your password must be between 6 to 18 characters and has a medium strength.',
    "Confirm Password": "Password must be matched."
}
const btn_class = "btn-1 mt-1 pointer";

function Login() {
    const [data, setData] = useState(data_init);

    function handleSubmit(e) {
        e.preventDefault();

        if (data.isSignIn) {
            if (data.input.Username.txt !== '' && data.input.Password.txt !== '') {
                setData(prev => ({...prev, allowSubmit: true}));
                setData(prev => ({...prev, input: data_init.input, allowSubmit: false, submitted: true}));
            } else {
                setData(prev => ({...prev, allowSubmit: false}));
            }
        } else {
            if (data.input.Username.txt !== '' && data.input.Password !== '' && data.input["Confirm Password"] !== '' && data.input.Email !== '') {
                setData(prev => ({...prev, allowSubmit: true}));
                setData(prev => ({...prev, input: data_init.input, allowSubmit: false, submitted: true}));
            } else {
                setData(prev => ({...prev, allowSubmit: false}));
            }
        }
    }

    function handleInput(e) {
        let test = false;
        const value = e.target.value;
        const name = e.target.name;

        if (name === "Username")
            test = checkUsername(value);
        else if (name === "Password")
            test = checkPassword(value);
        else if (name === "Confirm Password")
            test = checkConfirmPassword(value);
        else if (name === "Email")
            test = checkEmail(value);

        setData(prev => ({...prev, 
            input: {...prev.input, 
                [e.target.name]: {txt: e.target.value, warn: !test}
            }
        }));
    }

    function checkUsername(str) {
        return str.length > 6 && str.length < 30;
    }

    function checkPassword(str) {
        return true;
    }

    function checkConfirmPassword(str) {
        return str === data.input.Password.txt;
    }

    function checkEmail(str) {
        return str.length < 255
    }

    function showSignUp() {
        setData(prev => ({...data_init, isSignIn: !prev.isSignIn}))
    }

    return <main id="login">
        <div id="login_wrapper">
            <div id="login_form">
                <div className="center-1 mb-1">
                    <h3>Login</h3>
                </div>

                <form className='flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex-col gap-2'>
                        {data.isSignIn ? <SignIn data={data} handleInput={handleInput} /> 
                                       : <SignUp data={data} handleInput={handleInput} />}
                    </div>
                    
                    <button type='submit' className={data.allowSubmit ? btn_class + " allow" : btn_class + " not-allow"}>Sign In</button>
                    {data.submitted && <i className="loader --4"></i>}
                </form>

                <div className="flex-between mt-1">
                    <span className="pointer">Forgot Password ?</span>
                    <span className="pointer" onClick={showSignUp}>Sign Up</span>
                </div>
            </div>
        </div>
    </main>
}

function SignIn(props) {
    const { data, handleInput } = props
    return <>
        <Input value={data.input.Username.txt} setValue={handleInput} name="Username"/>
        <InputPass value={data.input.Password.txt} setValue={handleInput} name="Password"/>
    </>
}

function SignUp(props) {
    const { data, handleInput } = props
    const ipt = data.input;

    const username = ipt.Username.warn;
    const pass = ipt.Password.warn;
    const confirm = ipt["Confirm Password"].warn;
    const email = ipt.Email.warn;

    return <>
        <Input value={data.input.Username.txt} setValue={handleInput} name="Username" 
               className={username ? "input-2" : "input-1"} warning={{isShow: username, msg: warn.Username}}/>

        <InputPass value={data.input.Password.txt} setValue={handleInput} name="Password" 
                   className={pass ? "input-2" : "input-1"} warning={{isShow: pass, msg: warn.Password}}/>

        <InputPass value={data.input['Confirm Password'].txt} setValue={handleInput} name="Confirm Password" 
                   className={confirm ? "input-2" : "input-1"} warning={{isShow: confirm, msg: warn["Confirm Password"]}}/>

        <Input value={data.input.Email.txt} setValue={handleInput} name="Email" type="email" 
               className={email ? "input-2" : "input-1"}/>
    </>
}

export default Login;