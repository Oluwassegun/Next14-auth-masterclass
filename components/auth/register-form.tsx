'use client'
import * as z from 'zod';

import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-success';
import { Register } from '@/actions/register';

 


export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    })

const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
    setError('')
    setSuccess('')

    startTransition(() => {
        Register(values)
          .then((data) => {
            setError(data.error);
            setSuccess(data.success);
          })
          .catch(() => {
            setError('An unexpected error occurred.');
          });
      });
      
}

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel= "Already have an account?"
            backButtonHref="/auth/login"
            showSocials
        >
            <Form {...form}>
                 <form 
                 onSubmit={form.handleSubmit(onSubmit)}
                 className='space-y-6'
                 >
                  <div className='space-y-4'>
                  <FormField 
                    control = {form.control}
                    name = 'name'
                    render = {({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 disabled ={isPending}
                                 placeholder='John Doe'
                                
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control = {form.control}
                    name = 'email'
                    render = {({field}) =>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 disabled ={isPending}
                                 placeholder='john.doe@example.com'
                                 type= 'email'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField 
                    control = {form.control}
                    name = 'password'
                    render = {({field}) =>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                 {...field}
                                 disabled ={isPending}
                                 placeholder='Enter your password'
                                 type= 'password'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                  </div>
                  <FormError message={error} />
                  <FormSucess message={success}/>
                  <Button 
                  disabled ={isPending}
                  type = 'submit'
                  className ='w-full'
                  >
                    Create an Account
                 </Button>       
                 </form>
            </Form>
        </CardWrapper>
    )
}


