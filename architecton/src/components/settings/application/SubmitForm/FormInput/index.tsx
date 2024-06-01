import classNames from "classnames"
import { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, useState } from "react"

import "./index.css"

type OwnPropsType = InputHTMLAttributes<HTMLInputElement>

const FormInput = ({
    type = "text",
    name,
    value,
    className,
    ...otherProps
}: OwnPropsType) => {
    const [isFocused, setIsFocused] = useState(false)

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        otherProps?.onChange && otherProps?.onChange(e)
    }

    const onFocuseHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocused(true)
        otherProps?.onFocus && otherProps?.onFocus(e)
    }

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value
        setIsFocused(!!value)
        otherProps?.onBlur && otherProps?.onBlur(e)
    }

    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChangeHandler}
            className={classNames("primary-input", className)}
            onFocus={onFocuseHandler}
            onBlur={onBlurHandler}
            {...otherProps}
        />
    )
}

export default FormInput