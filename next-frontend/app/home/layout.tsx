

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            Navbar is under construction
            <div>
                {children}
            </div>
        </div>
    );
}
