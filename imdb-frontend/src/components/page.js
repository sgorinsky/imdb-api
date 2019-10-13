import React from 'react'

const Page = ({ array, page, setPage }) => {
    return (
        <>
            { array.slice((page - 1) * 20, page * 20) }
            <div className='page'>
                
                <button onClick={() => setPage(page - 1)} style={page===1 ? {display:'none'} : {display:''}}>
                    previous
                </button>
                <button onClick={() => setPage(page + 1)} style={page*20 >= array.length ? { display: 'none' } : { display: ''}}>
                    next
                </button>
                <p style={array.length === 0 ? { display: 'none' } : { display: '' }}>
                    displaying results {(page - 1) * 20 + 1} to {page * 20 >= array.length ? array.length : page*20} out of {array.length}
                </p>
                
            </div>
        </>
    )
        
}
export default Page