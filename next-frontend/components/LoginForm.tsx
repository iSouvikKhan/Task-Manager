"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { backendUrl } from '@/config/ApiConfig';

export function LoginForm() {

    const [email, setEmail] = useState("souvik1@gmail.com");
    const [password, setPassword] = useState("123123");
    const [errors, setErrors] = useState({ email: "", password: "", server: "" });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push("/home/list");
        }
    })

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: "", password: "", server: "" };

        if (!email) {
            newErrors.email = "Email is required.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: "", password: "", server: "" });
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/signin`, { email, password })
            setIsLoading(false);
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                router.push("/home/list");
            }
        } catch (error) {
            setIsLoading(false);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrors((prevErrors) => ({ ...prevErrors, server: error.response?.data.message }));
                } else if (error.request) {
                    console.error('No response received:', error.request);
                }
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, server: "Something went wrong. Please try again later." }));
            }
        }

    };


    return (
        <Card className="mx-auto w-3/4">
            <form onSubmit={handleSubmit}>
                <CardHeader className="pb-10">
                    <CardTitle className="text-xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid gap-6 sm:gap-8 md:gap-10 xl:gap-12">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ex@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                            </div>
                            <div className="text-center text-sm">
                                <Button type="submit" className="w-full mb-6" disabled={isLoading} onClick={handleSubmit}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                                {errors.server && <p className="text-red-600 text-sm mb-3">{errors.server}</p>}
                                Don't have an account?{" "}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
