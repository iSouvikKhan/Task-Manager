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

export function SignupForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", password: "", server: "" });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/home/list");
        }
    })

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: "", email: "", password: "", server: "" };

        if (!name) {
            newErrors.name = "Name is required.";
            valid = false;
        } else if (name.length < 3 || name.length > 20) {
            newErrors.name = "Name must be between 3 characters and 20 characters.";
            valid = false;
        }

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
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ name: "", email: "", password: "", server: "" });
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/signup`, { name, email, password })
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
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid gap-6 sm:gap-8 md:gap-10 xl:gap-12">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Full name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                            </div>
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
                                <Button type="submit" className="w-full mb-6">
                                    Create an account
                                </Button>
                                {errors.server && <p className="text-red-600 text-sm mb-3">{errors.server}</p>}
                                Already have an account?{" "}
                                <Link href="/" className="underline">
                                    Login
                                </Link>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
