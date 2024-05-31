import { t } from "i18next"

import "./ApplicationSubmitHeader.css"

const ApplicationSubmitHeader = () => {
    return (
        <div className="application-header">
            {t("application_submit_header")}
        </div>
    )
}

export default ApplicationSubmitHeader