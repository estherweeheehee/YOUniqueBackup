import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SearchResults from "../components/SearchResults";

const Search = () => {
    const [results, setResults] = useState();
    const params = useParams();
    const term = params.id
    const lowercaseTerm = term.toLowerCase()

    useEffect(() => {
        
        fetch(`/api/product/search/${lowercaseTerm}`)
          .then((response) => response.json())
          .then((data) => setResults(data));
      }, [lowercaseTerm]);
    
    return (
        <>
            <p className="max-w-2xl mx-auto py-2 px-2 sm:py-2 sm:px-4 lg:max-w-7xl lg:px-8 text-2xl font-extrabold tracking-tight text-gray-900">Search result for {term}:</p>
            <SearchResults results={results} />
        </>
    )
}

export default Search