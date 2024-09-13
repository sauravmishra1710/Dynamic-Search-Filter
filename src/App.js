import { useState } from 'react'

function App() {
  const [searchItem, setSearchItem] = useState('')

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  }

  return (
    <div style={{margin: "10px", justifyContent: "center", display: "grid"}}> 
      <h1>Dynamic Search Filter</h1>     
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
    </div>
  )
}

export default App