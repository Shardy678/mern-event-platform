export default function LongButton({text}) {
    return (
        <button className="
        w-full 
        px-4 
        py-2 
        text-white 
        hover:text-black 
        hover:offset-2 
        bg-black 
        rounded
        shadow-none
        border-black
        border-2
        hover:bg-pink-400
        hover:shadow-weird
        transform hover:-translate-y-1 
        hover:-translate-x-1 
        transition
        ">
            {text}
        </button>
    )
}