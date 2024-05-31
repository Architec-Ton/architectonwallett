import { useFetcher } from "react-router-dom"
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from "react"

import "./index.css"
import InputGroup from "./InputGroup"
import FormInputContainer from "./FormInputContainer"
import FormInputSocial from "./FormInputSocial"
import FormInput from "./FormInput"
import TermsButton from "./TermsButton"
import { t } from "i18next"

const formInitialValues = {
    assetName: '',
    smallDescription: '',
    fullDescription: '',
    tags: '',
    telegram: '',
    youtube: '',
    twitter: '',
    discord: '',
    resources: '',
    projectOwner: '',
    videoAbout: '',
    agriment: false
}

type InitialValuesType = typeof formInitialValues

const resourcesInfo = 'You need to upload content for your’s app. Logos, screenshoots, jetton logo, website logo etd. Put in a archive, upload and submit the link.'

const SubmitForm = () => {
    const fetcher = useFetcher({ key: "application-submit" })
    const [formValues, setFormValues] = useState<InitialValuesType>(formInitialValues)

    const onChangeHandler: FormEventHandler = (e) => {
        const form = e.currentTarget as HTMLFormElement
        const formNewValues = {} as InitialValuesType
        Object.keys(formValues).forEach((key: keyof typeof formValues) => {
            const element = form.elements[key]
            if (key === 'agriment') {
                formNewValues[key] = element.checked
            } else {
                formNewValues[key] = !!element.value && element.value || ''
            }
        })
        console.log(formNewValues)
        setFormValues(formNewValues)
    }

    const socialButtonClickHandler: CallableFunction = useCallback((name: keyof typeof formInitialValues) => {
        navigator.clipboard
            .readText()
            .then((clipText) => {
                setFormValues((currentValues) => ({ ...currentValues, [name]: clipText }))
            });
    }, [formValues])

    /** Проверка валидации пока оставляю дефолтное (по типу полей). Поскольку нет скринов с ошибками. */
    const isValid = useMemo((): boolean => {
        const { assetName, smallDescription, telegram, youtube, twitter, discord, projectOwner, agriment } = formValues
        const formIsValid = agriment && !!assetName && !!smallDescription && !!telegram && !!youtube && !!twitter && !!discord && !!projectOwner
        return formIsValid
    }, [formValues])

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (isValid && fetcher.state === "idle" && !fetcher.data) {
            fetcher.submit(fetcher.formData);
        }
        console.log("state", fetcher.state)
    }

    return (
        <fetcher.Form method="post" className="application-submit-form" onChange={onChangeHandler} onSubmit={onSubmit}>
            <InputGroup label={t("application_submit_main_info_label")}>
                <FormInputContainer name="assetName" label={t("asset_name_label")} value={formValues.assetName} required />
                <FormInputContainer name="smallDescription" label={t("small_description_label")} value={formValues.smallDescription} required />
                <FormInputContainer name="fullDescription" label={t("full_description_label")} value={formValues.fullDescription} />
                <FormInputContainer name="tags" label={t("tags_label")} value={formValues.tags} />
            </InputGroup>
            <InputGroup label={t("application_submit_socials_label")}>
                <FormInputSocial name="telegram" label={t("telegram_label")} pasteHandler={socialButtonClickHandler} value={formValues.telegram} required />
                <FormInputSocial name="youtube" label={t("youtube_label")} pasteHandler={socialButtonClickHandler} value={formValues.youtube} required />
                <FormInputSocial name="twitter" label={t("twitter_label")} pasteHandler={socialButtonClickHandler} value={formValues.twitter} required />
                <FormInputSocial name="discord" label={t("discord_label")} pasteHandler={socialButtonClickHandler} value={formValues.discord} required />
            </InputGroup>
            <InputGroup label={t("application_submit_resources_label")} info={t("application_submit_resources_info")}>
                <FormInputContainer name="resources" label={t("resources_label")} value={formValues.resources} />
            </InputGroup>
            <InputGroup label={t("application_submit_video_label")} info={""}>
                <FormInputContainer name="videoAbout" label={t("video_about_label")} value={formValues.videoAbout} />
            </InputGroup>
            <InputGroup label={t("application_submit_owner_label")}>
                <FormInputContainer name="projectOwner" label={t("project_owner_label")} value={formValues.projectOwner} required />
            </InputGroup>
            <InputGroup label={t("application_submit_terms_label")} hint={t("application_submit_terms_hint")}>
                <TermsButton />
                <FormInputContainer 
                    name="agriment" 
                    type="checkbox" 
                    checked={formValues.agriment} 
                    className="checkbox" 
                    label={t("application_submit_agriment_label")} 
                    containerClassName="checkbox-container"
                    required
                />
            </InputGroup>
            <FormInput type="submit" value={t("submit_button")} className="submit-button" />
        </fetcher.Form>
    )
}

export default SubmitForm