function CategoryFilter({ selectedCategory, setSelectedCategory }) {
    const categories = ["All", "Grocery", "School", "Personal"];
  
    return (
      <div className="card flex-apart">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selectedCategory ? "btn purple" : "btn"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
  
  export default CategoryFilter;
  