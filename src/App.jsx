import { useState } from 'react'
import Header from './components/header/header';
//import Footer from './components/footer/footer';
import RecipeGenerator from './components/recipe_generator/generator';
import LoadState from './components/load_state/load_state';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center content-center font-mono h-screen bg-blue-100">
      <header>
        <Header />
      </header>

      <div className="flex  flex-col justify-start content-center m-3 p-10 h-auto">
        <RecipeGenerator />
   
      </div>
      {/*<Footer />*/}
    </div>
  )
}

export default App
