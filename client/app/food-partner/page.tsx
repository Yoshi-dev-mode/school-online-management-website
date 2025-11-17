import Image from "next/image"

export default function food_partner(){
    return (
        <main>
            <div className="flex items-center">
                <Image src="/fork.png" height={30} width={30} alt="shopping bag" />
                <h1 className="ml-3 text-xl font-semibold">Order Now!</h1>
            </div>
        </main>
    )
}