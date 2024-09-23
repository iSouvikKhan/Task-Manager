import { ModeToggle } from "./ModeToggle"
import { SignupForm } from "./SignupForm"



export const Signup = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen space-y-6">
                <div className="flex justify-end pt-3 pr-3">
                    <ModeToggle />
                </div>
                <div className="flex-grow flex justify-center items-center">
                    <div className="w-4/5 min-h-[80vh] rounded-lg pt-8 pb-8 sm:pt-8 sm:pb-8 sm:px-2 border-2 border-slate-600 flex justify-between items-center mb-10 ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full w-full">
                            <div className="flex flex-col justify-evenly items-center px-10 space-y-4 lg:space-y-0 mb-6 lg:mb-0">
                                <div className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
                                    <p className="md:inline lg:block mb-0 lg:mb-2">Organize smarter, </p>
                                    <p className="md:inline lg:block">Accomplish faster.</p>
                                </div>
                                <div className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                                    <p className="md:inline lg:block mb-0 lg:mb-2">Your tasks, simplified. </p>
                                    <p className="md:inline lg:block">Your goals, achieved.</p>
                                </div>
                                <div className="hidden lg:block text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
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
