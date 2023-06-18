import CategoryService from '../services/categoryService.js'
const deleteCategory = async (req, res, next)=>{
    const {id} = req.params
    await CategoryService.deleteCategory(id)
    res.status(200).json({message: 'ok'})
}  
const deleteAll = async (req, res, next)=>{
    await CategoryService.deleteAll()
    res.status(200).json({message: 'ok'})
}  

const getAllCategories =async(req,res,next)=>{
    const categories =await CategoryService.getAllCategories()
    res.status(200).json({'categories': categories})
}

const createCategory =async (req, res, next)=>{
    const {name} = req.body;
    if ((await CategoryService.findByName(name)))
    return res.status(403).json({message: "Thể loại này đã tồn tại"})
    await CategoryService.createCategory(req.body, res)

return res.status(201).json({message: "ok"})
}

const updateCategory = async (req, res, next)=>{
    const {id} = req.params
    await CategoryService.updateCategory(id, req.body)
    res.status(200).json({message: 'ok'})
}
const moveItem = async (req, res, next)=>{
    await CategoryService.moveItem(req.body)
    res.status(200).json({message: 'ok'})
}

export default {
    createCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    deleteAll,
    moveItem
}