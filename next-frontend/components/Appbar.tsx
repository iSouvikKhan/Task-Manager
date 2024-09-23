"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

export const Appbar = () => {

    const router = useRouter();

    return (
        <>
            <div>
                <div className="float-right pt-3 pr-3">
                    <ModeToggle />
                </div>
                <div className="py-5">
                    <div className="flex justify-center">
                        <div className="w-11/12 lg:w-7/12">
                            <ul className="w-full border-2 border-slate-600 flex justify-between items-center text-base lg:text-xl p-1 px-5 rounded-lg">
                                <Link href="/home/list" className="hover:bg-slate-200 transition duration-500 p-2 rounded-lg">List</Link>
                                <Link href="/home/kanban" className="hover:bg-slate-200 transition duration-500 p-2 rounded-lg">Kanban</Link>
                                <button className="hover:bg-slate-200 transition duration-500 p-2 rounded-lg" onClick={() => {
                                    localStorage.removeItem("token");
                                    router.push("/");
                                }}>Sign Out</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}