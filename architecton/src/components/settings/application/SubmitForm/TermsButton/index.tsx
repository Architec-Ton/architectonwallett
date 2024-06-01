import { t } from "i18next"
import { Link } from "react-router-dom"
import assets from "../../../../../assets"

import "./index.css"

const TermsButton = () => {
    return (
        <div className="input-container">
            <Link className="terms-button" to="/settings/application-submit/terms">
                <img src={assets.iconTerms} className="terms-button__icon" alt="" />
                <span className="terms-button__text">{t("terms_label")}</span>
            </Link>
        </div>
    )
}

export default TermsButton