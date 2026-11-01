import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext.jsx';

export default function FavoriteButton({ product, withLabel = false }) {
  const { isFavorite, toggle } = useFavorites();
  const on = isFavorite(product.slug);
  return (
    <button
      type="button"
      className={`fav-btn ${on ? 'is-on' : ''} ${withLabel ? 'fav-btn--label' : ''}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${product.title} from favorites` : `Save ${product.title} to favorites`}
      onClick={() => toggle(product.slug)}
    >
      <Heart size={18} aria-hidden="true" fill={on ? 'currentColor' : 'none'} />
      {withLabel && <span>{on ? 'Saved' : 'Save'}</span>}
    </button>
  );
}