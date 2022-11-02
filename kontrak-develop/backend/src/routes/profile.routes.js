const express = require('express')
const app = express()
const kontrak = require('../Controllers/contractorProfile.controller')
const load= require('../Controllers/get-Contractors.controller')

const upload  = require("../middlewares/fileUpload");

app.post('/upload', upload.single("image"), kontrak.addProfile)
app.post('/cat',kontrak.addCategory);
app.post('/subcat',kontrak.addSubCat);
app.put('/Pass/:user_id',kontrak.updatePass)
app.put('/area/:user_id',kontrak.updateArea)
app.patch('/updatePic/:contractor_id', upload.single("image"),kontrak.updatePicture)
app.get('/getprofile/:user_id',kontrak.getProfile)
app.patch('/updateContact/:user_id',kontrak.updateContact)
app.put('/updateCat/:contractor_id',kontrak.updateCategory)
app.put('/updateSubCat/:sub_id',kontrak.updateSubCategory)
app.put('/updateFee/:contractor_id',kontrak.updateCalloutFee)
app.post('/image',upload.single("image"),kontrak.addImages)
app.delete('/dltimages',kontrak.deleteGallery)
app.patch('/updateName/:user_id', kontrak.updateName)


app.post('/finishProfile',kontrak.addProfile)
app.get('/onceOff/:user_id', kontrak.firstTime)
app.get('/con/:user_id',kontrak.getcon)
app.get('/ca/:contractor_id',kontrak.getca)
app.post('/complete', kontrak.finishProfile)


module.exports = app