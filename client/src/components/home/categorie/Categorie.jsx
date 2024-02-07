import React from 'react'
import Heading from '../../common/Heading'
import CategorieCard from './CategorieCard'
import './Categorie.css'

const Categorie = () => {
  return (
    <>
      <div className='categorie-background'>
        <Heading title='Our Categories' subtitle='Find All Type Of Property.' />
        <CategorieCard/>
      </div>
      
    </>
    
  )
}

export default Categorie