const Favorites = () => {
   // Datos de ejemplo de juegos favoritos
   const favoriteGames = [
       { id: 1, title: "Cyber Adventure", description: "Explore the futuristic world of Cyber Adventure and fight against AI." },
       { id: 2, title: "Fantasy Quest", description: "Embark on an epic quest in a world full of magic and mystery." },
       { id: 3, title: "Racing Mania", description: "Experience high-speed races and intense car chases." }
   ];

   return (
       <div className="space-y-4">
           <h2 className="text-2xl font-semibold text-gray-800">Your Favorite Games</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {favoriteGames.map(game => (
                   <div key={game.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                       <h3 className="text-lg font-bold text-gray-700">{game.title}</h3>
                       <p className="text-sm text-gray-600 mt-2">{game.description}</p>
                   </div>
               ))}
           </div>
       </div>
   );
};

export default Favorites;
