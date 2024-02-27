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
import { NewPasswordSchema } from '@/schemas';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token');
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');
    
        startTransition(() => {
            newPassword(values, token)
                .then((data: { error: string; success?: string } | { success: string; error?: string } | "error") => {
                    if (data === "error") {
                        setError('An unexpected error occurred.');
                    } else if ('error' in data) {
                        setError(data.error);
                    } else {
                        setSuccess(data.success);
                    }
                })
                .catch(() => {
                    setError('An unexpected error occurred.');
                });
        });
    }
    

    return (
        <CardWrapper
            headerLabel="Enter a new password"
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
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='******'
                                            type='password'
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
                     Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


