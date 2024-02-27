'use client'
import * as z from 'zod';

import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-success';
import { reset } from '@/actions/reset';
import { ResetSchema } from '@/schemas';


export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ''
        },
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
                .catch(() => {
                    setError('An unexpected error occurred.');
                });
        });

    }

    return (
        <CardWrapper
            headerLabel="Forgot password"
            backButtonLabel="Back to Login?"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='john.doe@example.com'
                                            type='email'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSucess message={success} />
                    <Button
                        disabled={isPending}
                        type='submit'
                        className='w-full'
                    >
                     Send New Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


