import classNames from "classnames"
import { FocusEventHandler, InputHTMLAttributes, useMemo, useState } from "react"
import FormInput from "../FormInput"

import "./index.css"

export type FormInputItemPropsType = {
    label?: string
    children?: React.ReactNode
    containerClassName?: string
}

type OwnPropsType = InputHTMLAttributes<HTMLInputElement> & FormInputItemPropsType

const FormInputContainer = ({ label, children, containerClassName, ...props }: OwnPropsType) => {
    const [isFocused, setIsFocused] = useState(false)

    const onFocuseHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocused(true)
        props?.onFocus(e)
    }

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value
        setIsFocused(!!value)
        props?.onBlur(e)
    }

    const inputProps = useMemo(() => {
        return { ...props, onFocus: onFocuseHandler, onBlur: onBlurHandler }
    }, [props])

    return (
        <div className={classNames("input-container", containerClassName)}>
            <label className={classNames("input-label", { "checkbox-label": props?.type === "checkbox" || props?.type === "radio"})}>
                {label && <span className={classNames("input-lable__title", { "focus": isFocused })}>{label}</span>}
                <FormInput {...inputProps} />
                {children}
            </label>
        </div>
    )
}

export default FormInputContainer