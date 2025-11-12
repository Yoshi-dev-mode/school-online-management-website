import Image from "next/image";
import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="pt-3 shadow-md sticky top-0 h-screen">
        <div className="flex items-center p-5">
            <Link href="/"><Image src="/logo.png" alt="Logo" width={150} height={30}/></Link>
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/home.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">Home</h3>
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/shopping-cart.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">My Cart</h3>
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/history.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">History</h3>
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/heart.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">Favorites</h3>          
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/fork.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">Food Partner</h3>
        </div>
        <div className="flex items-center pr-15 pl-10 py-4 cursor-pointer">
            <Image src="/logout.png" width={20} height={20} alt="Home"/>
            <h3 className="ml-3">Logout</h3>  
        </div>
    
    </aside>
  );
}
