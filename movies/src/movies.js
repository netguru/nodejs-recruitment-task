import db from "./db/db.js";

const movies = {
    movieExistsByTitle: async (title) => {
        const res = await db("movies")
            .where("title", title)
            .first();
        return typeof res !== "undefined"; 
    },
    insertMovie: async (movie) => {
        return await db("movies")
            .insert({
                title: movie.Title,
                released: movie.Released,
                genre: movie.Genre,
                director: movie.Director
            });
    },
    getMovies: async () => {
        const res = await db("movies")
            .select("*");
        return res
            .map(movie => {
                return {
                    Title: movie.title,
                    Released: movie.released,
                    Genre: movie.genre,
                    Director: movie.director
                }
            });
    }
};

export default movies;