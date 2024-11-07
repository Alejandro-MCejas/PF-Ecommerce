
interface ImagenUrlProps { 
    imagenUrl : string
}

export const HomeCardGame: React.FC<ImagenUrlProps> = ({ imagenUrl }: { imagenUrl: string }) => {
    return (
        <div className="flex justify-center gap-8">
            <div className="relative rounded-lg shadow-lg max-w-xs">
                <img src={imagenUrl} alt="logo" className="rounded-sm w-[270px] h-[370px]" />

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-300">Explore</button>
                </div>
            </div>
        </div>
    );
};
