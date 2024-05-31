import { useState } from "react"
import assets from "../../../../../assets"

import "./index.css"

export type InputGroupPropsType = {
    label?: string
    children: React.ReactNode
    info?: string
    hint?: string
}

const InputGroup = ({ children, label, info, hint }: InputGroupPropsType) => {
    const [isInfo, setIsInfo] = useState(false)

    const infoIconClickHandler = () => {
        setIsInfo(state => !isInfo)
    }

    return (
        <div className="input-group">
            {label && (
                <div className="input-group-label">
                    {label}
                    {info && <img src={assets.iconInfoCircle} onClick={infoIconClickHandler} className="icon-info" alt="" />}
                </div>
            )}
            <div className="input-group-body">
                {children}
            </div>
            {info && isInfo && (
                <div className="input-group__info">{info}</div>
            )}
            {hint && <div className="input-group__hint">{hint}</div>}
        </div>
    )
}

export default InputGroup