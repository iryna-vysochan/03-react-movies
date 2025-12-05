import type { Movie } from "../../types/movie";
import { makeImageUrl } from "../../services/imageUrl";
import styles from "./MovieGrid.module.css";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  // Галерея рендериться лише якщо є фільми
  if (movies.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? makeImageUrl(movie.poster_path)
          : null; // якщо постера немає, не рендеримо <img>

        return (
          <li key={movie.id}>
            <div className={styles.card} onClick={() => onSelect(movie)}>
              {imageUrl && (
                <img
                  className={styles.image}
                  src={imageUrl}
                  alt={movie.title}
                  loading="lazy"
                />
              )}
              <h2 className={styles.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

