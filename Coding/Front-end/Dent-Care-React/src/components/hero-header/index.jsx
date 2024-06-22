import React from 'react'

function HeroHeader({content}) {
  return (
    <>
    
        <div className="container-fluid bg-primary py-5 hero-header mb-5">
            <div className="row py-3">
                <div className="col-12 text-center">
                    <h1 className="display-3 text-white animated zoomIn">{content}</h1>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default HeroHeader