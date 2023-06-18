import { sequelize } from '../connectDB.js';
import { Category } from '../models/category.js';
import { Op } from 'sequelize';

const createCategory = async (body, res)=>{
     const { name, sort} = body;
    try{
    const rows = await Category.findAll({where: {sort: {[Op.gte]: sort}}})
    if (rows!=null){
      rows.map(async(e)=>{ 
      e.sort++;
      await e.save()
            })
    }
     const   category = await Category.create({name: name, sort: sort ?? await Category.count({where: {}})})
    return res.status(201).json({category: category});
       }
    catch(err){
        console.log('error create: ',err)
        throw err}
}

const deleteCategory = async (id)=>{
  console.log('delete category start')
  try{  
    const category = await Category.findOne({
      where: {id: id},
         })
    if (!category){ throw new Error({message:'Thể loại không tồn tại'})    } 

    const oldSort =category.sort;
    await category.destroy();
    const rows = await Category.findAll({where: {sort: {[Op.gt]: oldSort}}})
    if (rows!=null){
      rows.map(async(e)=>{ console.log('name', e.name)
           e.sort--;
      await e.save();})
    }
    }
    catch(err){
      throw  err
    }
}
const deleteAll = async (id)=>{
  
  try{  
    await Category.destroy({ truncate : true, cascade: false })
    }
    catch(err){
      throw  err
    }
}

const findById = async (id)=>{
  return await Category.findOne({
       where: {id: id},
     })    
}
const findByName = async (name)=>{
  return await Category.findOne({
       where: {name: name},
     })    
}

const getAllCategories = async () => {
    const categories = await Category.findAll({order: sequelize.literal('sort')});
    if(!categories) {
      throw new Error({message: "Thể loại not Found"});
    }
    return categories;
  }

const updateCategory = async (id, body)=>{
    const {name, sort} = body;
    try{
         const category = await Category.findOne({
         where: {id: id},
            })
      if (!category) throw new Error({message: 'Thể loại không tồn tại'}) 
      category.name = name;
      category.sort = sort;
  
      await category.save();
      }
      catch(err){
        throw  err
      }      
 }
const moveItem = async (body)=>{
    const {id, oldSort, newSort} = body;
       
    console.log('start move item', oldSort, newSort)
   
    try{
      const category = await Category.findOne({where: {id: id}})
       if (newSort > oldSort){
        
        const rows = await Category.findAll({where: {sort: {[Op.and]: {
          [Op.gt]: oldSort,
          [Op.lte]: newSort    } }}})
        if (rows!=null){
          rows.map(async(e)=>{ console.log('name', e.name)
          e.sort--;
          await e.save();})
        }
       }
       else {
        const rows = await Category.findAll({where: {sort: {[Op.and]: {
          [Op.gte]: newSort,
          [Op.lt]: oldSort    } }}})
        if (rows!=null){
          rows.map(async(e)=>{ console.log('name', e.name)
          e.sort++;
          await e.save();})
        }
       }
             category.sort = newSort;
       await category.save();
      }
      catch(err){
        throw  err
      }      
 }

export default {
    createCategory,
    deleteAll,
    deleteCategory,
    findByName,
    findById,
    getAllCategories,
    moveItem,
    updateCategory
}