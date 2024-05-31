import classNames from "classnames"
import FormInput from "../FormInput"

import "./index.css"

type OwnPropsType = {
    onClick: () => void
    value: string
    className?: string
}

const PasteButton = ({ value, className, onClick }: OwnPropsType) => {
    return (
        <FormInput type="button" value={value} onClick={onClick} className={classNames("text-button", className)} />
    )
}

export default PasteButton