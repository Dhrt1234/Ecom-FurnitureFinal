let mongoose = require("mongoose")
const {default: slugify} = require("slugify")

let subcategorySchema = new mongoose.Schema({
    subcategoryName: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 50,
        lowercase: true

    },                                                             //68349b674839b8e8f61e41f1                 
    parentCategory: { type: mongoose.Types.ObjectId, ref: "category" }, //68374556e568bbcaa6ba031b
    subcategoryImage: String,
    subcategoryOrder: Number,
    subcategoryStatus: Boolean,
    slug: String
})

subcategorySchema.pre('save', function (next) {
    this.slug = slugify(this.subcategoryName, { lower: true });
    next();
});


subcategorySchema.virtual('sub_subcategories', {
    ref: 'sub_subcategory',
    localField: '_id',
    foreignField: 'subCategory'
});


subcategorySchema.set('toJSON', { virtuals: true });
let subcategoryModel = mongoose.model("subcategory", subcategorySchema)
module.exports = { subcategoryModel }
