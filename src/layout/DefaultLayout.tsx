import NavBar from '@/components/social/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

interface DefaultLayoutProps {}
const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <main>
       <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className='bg-gray-100 dark:bg-gray-800'
      >
        <NavBar />
      <Outlet />
      </motion.div>
    </main>
  )
}

export default DefaultLayout
