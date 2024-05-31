import { InputHTMLAttributes } from "react"
import FormInputContainer from "../FormInputContainer"
import PasteButton from "../PasteButton"
import { t } from "i18next"

type OwnPropsType = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    pasteHandler: CallableFunction
}

const FormInputSocial = ({ name, label, pasteHandler, ...props }: OwnPropsType) => {

    const clickHandler = () => {
        pasteHandler(name)
    }
    return (
        <FormInputContainer name={name} label={label} {...props}>
            <PasteButton value={t("past_button")} onClick={clickHandler} />
        </FormInputContainer>
    )
}

export default FormInputSocial