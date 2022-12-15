import {useState, useId} from 'react';

import axios from 'axios'
import show from '../../image/view.png';
import hide from '../../image/hide.png';


const data_init = {
    input: {
        Username: '',
        Password: '',
        "Confirm Password": '',
        Email: ''
    },

    isSignIn: true,
    allowSubmit: false
}
const btn_class = "btn-1 mt-1 pointer";
function Login() {

    const [data, setData] = useState(data_init);

    function handleSubmit(e) {
        e.preventDefault();
        
        if (data.allowSubmit) {
            setData(prev => ({...prev, input: data_init.input, allowSubmit: false}));
        }
    }

    function handleInput(e) {
        setData({...data, input: {...data.input, [e.target.name]: e.target.value} });

        if (data.isSignIn) {
            if (data.input.Username !== '' && data.input.Password !== '') {
                setData(prev => ({...prev, allowSubmit: true}));
            } else {
                setData(prev => ({...prev, allowSubmit: false}));
            }
        }
    }

    function showSignUp() {
        setData(prev => ({...prev, isSignIn: !prev.isSignIn}))
    }

    return <main id="login">
        <div id="login_wrapper">
            <div id="login_form">
                <div className="center-1">
                    <h3>Login</h3>
                </div>

                <form className='flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex-col gap-2'>
                        <Input value={data.input.Username} setValue={handleInput} name="Username"/>
                        <InputPass value={data.input.Password} setValue={handleInput} name="Password"/>
                        {data.isSignIn || <InputPass value={data.input['Confirm Password']} setValue={handleInput} name="Confirm Password"/>}
                        {data.isSignIn || <Input value={data.input.Email} setValue={handleInput} name="Email"/>}
                    </div>
                    
                    <button type='submit' className={data.allowSubmit ? btn_class + " allow" : btn_class + " not-allow"}>Sign In</button>
                </form>

                <div className="flex-between mt-1">
                    <span className="pointer">Forgot Password ?</span>
                    <span className="pointer" onClick={showSignUp}>Sign Up</span>
                </div>
            </div>
        </div>
    </main>
}

function Input(props) {
    const { value, setValue, name } = props
    const id = useId();

    return <div className='flex-col gap-05'>
        <div className="flex-between">
            <label htmlFor={`input-${id}`} className="label-1 pointer">{name}</label>
            {/* <div className="ipt-required">Required *</div> */}
        </div>
        <div className="flex-col">
            <div className="inherit">
                <input type="text" id={`input-${id}`} name={name} className="input-1" placeholder=" " maxLength={255}
                        value={value} onChange={setValue} required/>
            </div>
        </div>
    </div>
}

function InputPass(props) {
    const { value, setValue, name, required = true } = props
    const id = useId();

    const [pass, setPass] = useState({display: show, type: "password"});
    function toggleView() {
        setPass(prev => {
            if (prev.display === show) {
                return {display: hide, type: "text"};
            } else {
                return {display: show, type: "password"};
            }
        });
    }

    return <div className="flex-col gap-05">
        <div className="flex-between">
            <label htmlFor={`password-${id}`} className="label-1 pointer">{name}</label>
            {/* <div className="ipt-required">Required *</div> */}
        </div>
        <div className="flex-col gap-1">
            <div className="inherit relative">
                <input type={pass.type} id={`password-${id}`} name={name} className="input-1" placeholder=" " maxLength={16}
                        value={value} onChange={setValue} required={required}/>

                <div className="pass-wrap flex-center">
                    <img className="pass-img" src={pass.display} onClick={toggleView}/>
                </div>
            </div>
        </div>
    </div>
}

export default Login;