import React from 'react'
import Nav from './../components/Navbar'
import AdminKey from './../components/AdminKey'

function AdminHome() {
  return (
    <>
      <Nav/>
      <div className="m-20">
      {
        
        <AdminKey/>
      
      }
        
      </div>
      
    </>
  )
}

export default AdminHome