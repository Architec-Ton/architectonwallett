import { redirect, useFetcher, useNavigate } from "react-router-dom"
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from "react"

import "./index.css"
import InputGroup from "./InputGroup"
import FormInputContainer from "./FormInputContainer"
import FormInputSocial from "./FormInputSocial"
import FormInput from "./FormInput"
import TermsButton from "./TermsButton"
import { t } from "i18next"
import PasteButton from "./PasteButton"
import { BE_URL } from "../../../../constants"
import Loader from "../../../ui/Loader"

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

export const ApplicationSubmitAction = async ({ request }) => {
    try {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const response = await fetch(`${BE_URL}/onboard`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ ...data, agriment: data.agriment === "1" })
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        return  redirect("/dev/wallet")
    } catch (e) {
        console.error(e)
        return null
    }
}

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
        setFormValues(formNewValues)
    }

    const pasteButtonClickHandler: CallableFunction = useCallback((name: keyof typeof formInitialValues) => {
        navigator.clipboard
            .readText()
            .then((clipText) => {
                setFormValues((currentValues) => ({ ...currentValues, [name]: clipText }))
            });
    }, [formValues])

    const onPast = (name: keyof typeof formInitialValues) => () => {
        pasteButtonClickHandler(name)
    }

    /** Проверка валидации пока оставляю дефолтное (по типу полей). Поскольку нет скринов с ошибками. */
    const isValid = useMemo((): boolean => {
        const { assetName, smallDescription, telegram, youtube, twitter, discord, projectOwner, agriment } = formValues
        const formIsValid = agriment && !!assetName && !!smallDescription && !!telegram && !!youtube && !!twitter && !!discord && !!projectOwner
        return formIsValid
    }, [formValues])

    if (fetcher.state === 'submitting') {
        return <Loader title="" />
    }

    return (
        <fetcher.Form method="post" className="application-submit-form" onChange={onChangeHandler}>
            <InputGroup label={t("application_submit_main_info_label")}>
                <FormInputContainer name="assetName" label={t("asset_name_label")} value={formValues.assetName} required />
                <FormInputContainer name="smallDescription" label={t("small_description_label")} value={formValues.smallDescription} required />
                <FormInputContainer name="fullDescription" label={t("full_description_label")} value={formValues.fullDescription} />
                <FormInputContainer name="tags" label={t("tags_label")} value={formValues.tags} />
            </InputGroup>
            <InputGroup label={t("application_submit_socials_label")}>
                <FormInputSocial name="telegram" label={t("telegram_label")} pasteHandler={pasteButtonClickHandler} value={formValues.telegram} required />
                <FormInputSocial name="youtube" label={t("youtube_label")} pasteHandler={pasteButtonClickHandler} value={formValues.youtube} required />
                <FormInputSocial name="twitter" label={t("twitter_label")} pasteHandler={pasteButtonClickHandler} value={formValues.twitter} required />
                <FormInputSocial name="discord" label={t("discord_label")} pasteHandler={pasteButtonClickHandler} value={formValues.discord} required />
            </InputGroup>
            <InputGroup label={t("application_submit_resources_label")} info={t("application_submit_resources_info")}>
                <FormInputContainer name="resources" label={t("resources_label")} value={formValues.resources} >
                    <PasteButton value={t("paste_button")} onClick={onPast("resources")} />
                </FormInputContainer>
            </InputGroup>
            <InputGroup label={t("application_submit_video_label")} info={""}>
                <FormInputContainer name="videoAbout" label={t("video_about_label")} value={formValues.videoAbout}>
                    <PasteButton value={t("paste_button")} onClick={onPast("videoAbout")} />
                </FormInputContainer>
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
                    value={formValues.agriment ? 1 : 0}
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