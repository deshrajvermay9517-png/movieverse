function Navbar({ favoriteCount }) {
  return (
    <header className="navbar">
      <div>
        <h1>MovieVerse</h1>
        <p>Search movies, view details, and save favorites</p>
      </div>

      <div className="favorite-badge">
        Favorites: {favoriteCount}
      </div>
    </header>
  );
}

export default Navbar;