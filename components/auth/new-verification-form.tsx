'use client';
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSucess } from "../form-success";


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchPrams = useSearchParams()
    const token = searchPrams.get('token')


    const onsubmit = useCallback(() => {
        if (!token) {
            setError('Missing token!')
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error)
            })
            .catch(() => {
                setError('something wwent wrong')
            })
    }, [token])

    useEffect(() => {
        onsubmit();
    }, [])

    return (
        <CardWrapper
            headerLabel="Confriming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                     <BeatLoader />
                )}
              
                <FormSucess message={success} />
                <FormError message={error} />
            </div>

        </CardWrapper>
    )
}


