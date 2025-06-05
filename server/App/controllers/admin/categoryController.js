const { categoryModel } = require("../../models/categoryModel")
let fs = require("fs")
let categoryInsert = async (req, res) => {

    let { categoryName, categoryOrder } = req.body
    let categoryStatus = false;
    let obj = {
        categoryName,
        categoryOrder,
        categoryStatus
    }
    if (req.file) {
        if (req.file.filename) {
            console.log(req.file.filename)
            obj['categoryImage'] = req.file.filename
        }
    }

    try {

        let categoryRes = await categoryModel.insertOne(obj)
        console.log(categoryRes)
        obj = {
            status: 1,
            msg: "Category Save successfully!!",
            categoryRes
        }
        console.log("success", obj)
        res.send(obj)

    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Category does not save. ",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }


}

let categoryView = async (req, res) => {

    let { currentPage, limit } = req.query;
    let searchobj = {


    }
    console.log("categoryName", req.query.categoryName)
    console.log("categoryOrder", req.query.categoryOrder)

    if (req.query.categoryName != "") {
        //searchobj['categoryName']= {$regex:req.query.categoryName, $options: "i"} through moongoose
        searchobj['categoryName'] = new RegExp(req.query.categoryName, "i") //through RegExp function
    }

    if (req.query.categoryOrder != "") {
        searchobj['categoryOrder'] = Number(req.query.categoryOrder)
        console.log("categoryOrder", searchobj['categoryOrder'])
    }

    try {

        let finalSkip = (currentPage - 1) * limit;

        let data = await categoryModel.find(searchobj).skip(finalSkip).limit(limit);
        let allData = await categoryModel.find(searchobj);

        let obj = {
            status: 1,
            totalData: allData.length,
            pages: Math.ceil(allData.length / limit),
            msg: "category view",
            staticPath: process.env.CATEGORYIMAGEPATH,
            data
        }

        res.send(obj)
         console.log("suc", obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}

let categoryDelete = async (req, res) => {
    let { ids } = req.body
    let categoryView = await categoryModel.find({ _id: ids }).select("categoryImage")


    for (let v of categoryView) {
        let deletePath = "uploads/category/" + v.categoryImage;
        fs.unlinkSync(deletePath)

    }

    let data = await categoryModel.deleteMany({ _id: ids })

    let obj = {
        status: 1,
        msg: "Category is deleted successfully!!"
    }

    res.send(obj)
}

let changeStatus = async (req, res) => {
    let { ids } = req.body;
    let allcategories = await categoryModel.find({ _id: ids }).select('categoryStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for (let items of allcategories) {
        await categoryModel.updateOne({ _id: items._id }, { $set: { categoryStatus: !items.categoryStatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)

}

let categoryUpdate = async (req, res) => {
    let { id } = req.params
    let obj
    let { categoryName, categoryOrder } = req.body

    let categoryAdd = {
        categoryName,
        categoryOrder,
        categoryStatus: true
    }

    if (req.file) {
        if (req.file.filename) {
            categoryAdd['categoryImage'] = req.file.filename
        }
    }
   
    try {
        let categoryView = await categoryModel.find({ _id: id }).select("categoryImage")

        for (let v of categoryView) {
            let deletePath = "uploads/category/" + v.categoryImage
            fs.unlinkSync(deletePath)
        }
        let data = await categoryModel.updateOne({ _id: id }, { $set: categoryAdd })
        obj = {
            status: 1,
            msg: "Category Updated Successfully!!",
            data
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Enter Valid Category Records"
        }
        res.send(obj)
    }
}

let singleCategoryView = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let data = await categoryModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "category view ",
             staticPath: process.env.CATEGORYIMAGEPATH,
            data
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }
}

module.exports = { categoryInsert, categoryView,categoryUpdate, categoryDelete, changeStatus, singleCategoryView }