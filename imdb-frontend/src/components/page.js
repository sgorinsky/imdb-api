import React from 'react'

const Page = ({ array, page, setPage }) => {
    const showWhenFalse = array.length === 0 ? { display: 'none' } : { display: '' }
    const showWhenTrue = array.length === 0 ? { display: '' } : { display: 'none' }
    return (
        <div>
            <div className='page' style={showWhenFalse}>
                { array.slice((page - 1) * 20, page * 20) }
                <button className="btn btn-space btn-info btn-sm" onClick={() => setPage(page - 1)} style={page===1 ? {display:'none'} : {display:''}}>
                    previous
                </button>
                <button className="btn btn-space btn-dark btn-sm" onClick={() => setPage(page + 1)} style={page*20 >= array.length ? { display: 'none' } : { display: ''}}>
                    next
                </button>
                <p >
                    {(page - 1) * 20 + 1}-{page * 20 >= array.length ? array.length : page*20} of {array.length}
                </p>
                <p style={showWhenTrue}>
                    No results to display
                </p>
                
            </div>
            <div className="no-show">                
                <p style={showWhenTrue}>
                    No results to display
                </p>
            </div>
        </div>
    )
        
}
export default Page