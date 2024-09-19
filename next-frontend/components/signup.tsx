import { ModeToggle } from "./ModeToggle"
import { SignupForm } from "./SignupForm"


export const Signup = () => {
    return (
        <>
            <div
                className="h-screen relative">
                <div className="absolute top-5 right-10">
                    <ModeToggle />
                </div>
                <div className="flex justify-center items-center h-full">
                    <div className="w-4/5 h-4/5 border-2 rounded-lg border-slate-600 p-2">
                        <div className="grid grid-cols-2 gap-2 h-full">
                            <div className="flex flex-col justify-evenly items-center px-10">
                                <div className="flex flex-col space-y-4 text-6xl">
                                    <p className="font-semibold">Organize smarter,</p>
                                    <p className="font-semibold">accomplish faster.</p>
                                </div>
                                <div className="text-3xl">
                                    <p>Your tasks, simplified. Your goals, achieved.</p>
                                </div>
                                <div className="text-3xl">
                                    <p>Sign up &#126;&#62;</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <SignupForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

