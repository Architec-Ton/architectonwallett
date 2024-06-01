import { t } from "i18next"
import assets from "../../../../../assets"

import "./index.css"

const TermsButton = () => {

    const termsHandler = () => {
        console.log("Terms are comming soon")
    }

    return (
        <div className="input-container">
            <div className="terms-button" onClick={termsHandler}>
                <img src={assets.iconTerms} className="terms-button__icon" alt="" />
                <span className="terms-button__text">{t("terms_label")}</span>
            </div>
        </div>
    )
}

export default TermsButton