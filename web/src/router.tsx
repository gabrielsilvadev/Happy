import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Landing from './pages/landing'
import Orphane from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes(){
    return(
     <BrowserRouter>
     <Switch>
     <Route  path='/' exact    component={Landing}/>
     <Route   path='/app'  component={Orphane}/>
     <Route   path='orphanage/:id'  component={Orphanage}/>
     <Route    path='/orphange/create'   component={CreateOrphanage}/>
     </Switch>
     </BrowserRouter>

    
    )
}
export default Routes;
