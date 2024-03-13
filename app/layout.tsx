import "./global.css"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import React from "react"

export default function RootLayout({
    children,   
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body className="bg-slate-950 text-pink-200">
                <div className="flex grow h-full">
                    <Navbar></Navbar>
                    <div className="grow mx-5 mt-5 p-5 ">
                        {children}
                    </div>
                </div>
                <Footer></Footer>
            </body>
           
        </html>
    )
}