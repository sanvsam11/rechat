import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom"
export default function PublicRoute({component: Component, authenticated, ...rest}){
    return(
        <Route
            {...rest}
            render={(props)=>authenticated===false
                        ? <Component{...props}/>
                        : <Redirect to='/chat'/>}
        />
    )
}