"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function UserAuth() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const alert = () => {
        toast.success("Success to show it", {
            position: "top-left"
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert();
        console.log("Formulário enviado com:", formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='p-3 w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                <Input 
                    name="email" 
                    placeholder='Email' 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <Input 
                    name="password" 
                    type="password"
                    placeholder='Senha' 
                    value={formData.password} 
                    onChange={handleChange} 
                />

                <Button type="submit" className='bg-amber-400 hover:bg-amber-500 cursor-pointer'>
                    Entrar
                </Button>
            </form>
        </div>
    )
}
