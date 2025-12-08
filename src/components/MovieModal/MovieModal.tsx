import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import { makeImageUrl } from "../../services/imageUrl";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root")!;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const backdropUrl = movie.backdrop_path
    ? makeImageUrl(movie.backdrop_path, "original")
    : null;

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

