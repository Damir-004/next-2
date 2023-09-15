import Link from "next/link";

const Header = () => {
    return(
        <header className="main">
            <div className="container">
                <Link href="/">Home</Link>
                <Link href="/electronics">electronics</Link>
                <Link href="/jewelery">jewelery</Link>
                <Link href="/men">men's clothing</Link>
                <Link href="/women">women's clothing</Link>
            </div>
        </header>
    )
}
export {Header};