import React, { useState } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary.jsx'

function App(){
    const [state, setState] = useState();
    const apiUrlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

    return (
        <div className="App">
        <ErrorBoundary>
            <AppHeader />
        </ErrorBoundary>
        </div>
    )
}

export default App;