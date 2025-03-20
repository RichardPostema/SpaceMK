import Link from "next/link"
export const Navigation = () => {
    return (
        <nav>
        <link href="/" className="mr-4 text-blue-500">Home</link>
        <link href="/about">About</link>
        <link href="/products/1" className="mr-4 text-blue-500">Products 1</link>
        </nav>
    )
}