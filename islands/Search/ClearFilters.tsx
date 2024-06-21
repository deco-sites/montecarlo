function Island() {
  const clearFilters = () => {
    const url = new URL(window.location.href);
    const pathName = url.pathname;
    const searchParams = url.searchParams;

    const keysToDelete = [];
    for (const param of searchParams.keys()) {
        if (param.startsWith("filter.")) {
            keysToDelete.push(param);
        }
    }

    keysToDelete.forEach(key => searchParams.delete(key));

    return pathName + "?" + searchParams.toString();
  };
  
  return (
    <a
      class="font-poppins uppercase text-black bg-[#f7ead5] px-2 py-2 text-center text-sm"
      href={clearFilters()}
    >
      Limpar Filtro
    </a>
  );
}

export default Island;
