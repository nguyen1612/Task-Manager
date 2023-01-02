import {useState, useId} from 'react';

import show from '../image/view.png';
import hide from '../image/hide.png';

export function Input(props) {
    const { value, setValue, name, type = "text",
        className = "input-1", warning = {isShow: false, msg: ''} 
    } = props
    const id = useId();

    return <div className='flex-col gap-05'>
        <div className="flex-between">
            <label htmlFor={`input-${id}`} className="label-1 pointer">{name}</label>
            {/* <div className="ipt-required">Required *</div> */}
        </div>
        <div className="flex-col">
            <div className="inherit">
                <input type={type} id={`input-${id}`} name={name} className={className} placeholder=" " maxLength={255}
                        value={value} onChange={setValue} required/>
            </div>
        </div>
        {warning.isShow && <div className="ipt-required">{warning.msg}</div>}
    </div>
}

export function InputPass(props) {
    const { value, setValue, name, required = true,
        className = "input-1", warning = {isShow: false, msg: ''}  
    } = props
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
                <input type={pass.type} id={`password-${id}`} name={name} className={className} placeholder=" " maxLength={16}
                        value={value} onChange={setValue} required={required}/>

                <div className="pass-wrap flex-center">
                    <img className="pass-img" src={pass.display} onClick={toggleView}/>
                </div>
            </div>
        </div>
        {warning.isShow && <div className="ipt-required">{warning.msg}</div>}
    </div>
}