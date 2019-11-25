import * as React from 'react'
import Header from './Header'

interface Props {
    
}

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
  };

const Layout: React.FC<Props> = (props) => {
    return (
        <div style={layoutStyle}>
            <Header />
            {props.children}
        </div>
    )
}

export default Layout