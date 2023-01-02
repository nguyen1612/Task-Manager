import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { Input, InputPass } from '../utils';
import {
    checkUsername, checkPassword
} from './utils'


const data_init = {
    input: {
        Email: {txt: '', warn: false, pass: false},
        Password: {txt: '', warn: false, pass: false},
    },

    allowSubmit: false,
    submitted: false,
}
const btn_class = "btn-1 mt-1 pointer";
const FIXED_URL = 'http://localhost:5000/users/signin';

function Login() {
    const [data, setData] = useState(data_init);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (data.allowSubmit) {
            setData(prev => ({...prev, input: data_init.input, allowSubmit: false, submitted: true}));

            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Beaer asd"
            }

            const s_data = {
                email: data.input.Email.txt,
                password: data.input.Password.txt,
            }

            axios.post(FIXED_URL, s_data, headers)
                 .then(() => {
                    setData(prev => ({...prev, submitted: false}));
                    navigate('/');
                 })
                 .catch(err => console.log(err));
        }
    }

    function handleInput(e) {
        let test = false;
        let allowSubmit = true;
        const value = e.target.value;
        const name = e.target.name;

        if (name === "Email")
            test = checkUsername(value);
        else if (name === "Password")
            test = checkPassword(value);

        if (test) {
            for (const [key, val] of Object.entries(data.input))
                if (name !== key && !val.pass)
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

    function showSignUp() {
        navigate('/signup');
    }

    return <main id="login">
        <div id="login_wrapper">
            <div id="login_form">
                <div className="center-1 mb-1">
                    <h3>Login</h3>
                </div>

                <form className='flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex-col gap-2'>
                        <Input value={data.input.Email.txt} setValue={handleInput} name="Email"/>
                        <InputPass value={data.input.Password.txt} setValue={handleInput} name="Password"/>
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

export default Login;