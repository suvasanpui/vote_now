import React from 'react'
import Nav from './../components/Navbar'
import AdminKey from './../components/AdminKey'

function AdminHome() {
  return (
    <>
      <div className=''>
        <Nav/>
      </div>
      <div
        className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('background3.jpg')",
          backgroundSize: "cover", // Ensures the image covers the container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating the image
        }}
      >
      <div className="m-20">
      {
        
        <AdminKey/>
      
      }
        
      </div>
      </div>
    </>
  )
}

export default AdminHome


/* '/electors' (POST) - it is used for added elctor by admin (valid admin token is needed) . */
/*next day assignment assegnment */