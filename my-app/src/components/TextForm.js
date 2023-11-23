import React from "react";

const TextForm = (props) => {
    const {name, label, value, onChange, type, placeholder} = props ;
    return(
        <>
        <p style={{ lineHeight: '0' ,fontFamily: "Montserrat"}}>{label}</p>
        <input type={type ? type : "text"} name={name} id= {name} placeholder={label ? label : placeholder} value={value}  onChange={onChange} required/>
       </>
    )
}

export default TextForm