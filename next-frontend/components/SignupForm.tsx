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

export function SignupForm() {
    return (
        <Card className="mx-auto w-3/4">
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
                            <Input id="first-name" placeholder="enter your name" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ex@gmail.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="******" />
                        </div>
                        <div className="text-center text-sm">
                            <Button type="submit" className="w-full mb-6">
                                Create an account
                            </Button>
                            Already have an account?{" "}
                            <Link href="/" className="underline">
                                    Login
                            </Link>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
