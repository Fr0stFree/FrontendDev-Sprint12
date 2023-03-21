import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function NavigatePage({children, to, isNavigate}) {
    const navigate = useNavigate();
    useEffect(()=>{
        if (isNavigate) {
            navigate(to)
        }
    }, [isNavigate])
    return (children);
}

export default NavigatePage;