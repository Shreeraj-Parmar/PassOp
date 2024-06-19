import React from 'react'

const Footer = () => {
  return (
    <div className='footer bg-slate-700  h-[8vh] fixed bottom-0 w-full'>
      <div className="footer-logo text-white flex items-center justify-center">
      <h1 className='text-2xl font-bold text-center'>
      <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
                    </h1>
      </div>
      <div className="ft-text flex justify-center">
                <h3 className='text-white'>

                    Created with  


                </h3>&nbsp;<img src="img/heart.png" width={23} height={14} alt="" />&nbsp;<h3 className='text-white'>
                by Shreeraj Parmar</h3>
      </div>
    </div>
  )
}

export default Footer
