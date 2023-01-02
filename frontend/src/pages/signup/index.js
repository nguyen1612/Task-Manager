import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { Input, InputPass } from '../utils';
import {
    checkConfirmPassword, checkEmail,
    checkUsername, checkPassword
} from './utils'

// nguyenpgn1612@gmail.com
const warn = {
    Username: 'Your username must be between 6 to 30 characters.',
    Password: 'Your password must be between 6 to 18 characters and has a medium strength.',
    "Confirm Password": "Password must be matched."
}
const data_init = {
    input: {
        Username: {txt: '', warn: false, pass: false, msg: warn.Username},
        Password: {txt: '', warn: false, pass: false, msg: warn.Password},
        "Confirm Password": {txt: '', warn: false, pass: false},
        Email: {txt: '', warn: false, pass: false, msg: ""}
    },

    allowSubmit: false,
    submitted: false,
    success: false
}
const btn_class = "btn-1 mt-1 pointer";
const FIXED_URL = 'http://localhost:5000/users/signup';

function Signup() {
    const [data, setData] = useState(data_init);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (data.allowSubmit) {
            setData(prev => ({...prev, allowSubmit: false, submitted: true}));

            const headers = {"Content-Type": "application/json"}

            const s_data = {
                username: data.input.Username.txt,
                password: data.input.Password.txt,
                email: data.input.Email.txt,
            }

            axios.post(FIXED_URL, s_data, headers)
                 .then(() => {
                    setData(prev => ({...prev, submitted: false, success: true}));
                    // navigate('/');
                 })
                 .catch(err => {
                    setData(prev => ({...prev, submitted: false}));
                    if (err.response.status === 400)
                        inputWarn('Email');
                 });
        }
    }

    function handleInput(e) {
        let test = false;
        let allowSubmit = true;
        const value = e.target.value;
        const name = e.target.name;

        if (name === "Username")
            test = checkUsername(value);
        else if (name === "Password")
            test = checkPassword(value);
        else if (name === "Confirm Password")
            test = checkConfirmPassword(value, data);
        else if (name === "Email")
            test = checkEmail(value);

        if (test) {
            for (const [key, val] of Object.entries(data.input))
                if (key !== name && !val.pass)
                    allowSubmit = false;
        } else {
            allowSubmit = false;
        }

        setData(prev => ({...prev, allowSubmit,
            input: {...prev.input, 
                [e.target.name]: {txt: e.target.value, warn: !test, pass: test}
            }
        }));
    }

    function inputWarn(key) {
        const msg = "Existed Email. Please provide different one.";
        setData(prev => ({...prev, 
            input: {...prev.input, [key]: {...prev.input[key], warn: true, pass: false, msg}}
        }));
    }

    function showSignIn() {
        navigate('/login');
    }
    
    const username = data.input.Username.warn;
    const pass = data.input.Password.warn;
    const confirm = data.input["Confirm Password"].warn;
    const email = data.input.Email;

    if (data.success)
        return notification(data.input.Email.txt);

    return <main id="login">
        <div id="login_wrapper">
            <div id="login_form">
                <div className="center-1 mb-1">
                    <h3>Sign Up</h3>
                </div>

                <form className='flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex-col gap-2'>
                        <Input value={data.input.Username.txt} setValue={handleInput} name="Username" 
                            className={username ? "input-2" : "input-1"} warning={{isShow: username, msg: warn.Username}}/>

                        <Input value={data.input.Email.txt} setValue={handleInput} name="Email" type="email" 
                            className={email.warn ? "input-2" : "input-1"} warning={{isShow: email.warn, msg: email.msg }}/>

                        <InputPass value={data.input.Password.txt} setValue={handleInput} name="Password" 
                                className={pass ? "input-2" : "input-1"} warning={{isShow: pass, msg: warn.Password}}/>

                        <InputPass value={data.input['Confirm Password'].txt} setValue={handleInput} name="Confirm Password" 
                                className={confirm ? "input-2" : "input-1"} warning={{isShow: confirm, msg: warn["Confirm Password"]}}/>
                    </div>
                    
                    <button type='submit' className={data.allowSubmit ? btn_class + " allow" : btn_class + " not-allow"}>Sign In</button>
                    {data.submitted && <i className="loader --4"></i>}
                </form>

                <div className="flex-between mt-1">
                    <span className="pointer">Forgot Password ?</span>
                    <span className="pointer" onClick={showSignIn}>Sign Up</span>
                </div>
            </div>
        </div>
    </main>
}

function notification(email) {
    return <main id="login">
    <div id="login_wrapper">
        <div id="login_form">
            <div className="center-1 mb-1">
                <h3>Sign Up</h3>
                <p className="mt-1">An email was sent to <b>{email}</b>. Please confirm your email address.</p>
            </div>
        </div>
    </div>
    </main>
}


export default Signup;