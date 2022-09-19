'use strict'

const Product = require('../models/product.model');
const path = require('path');
const fs = require('fs');

function saveProduct(req, res)
{
    let product = new Product();
    let params = req.body;

    if('admin' != req.user.role)
    {
        req.status(403).send({message: 'No tienes permiso para agregar un producto'});
    }
    else
    {
        if(params.name && params.price && params.size && params.gender)
        {
            product.name = params.name;
            product.price = params.price;
            product.available = 'Disponible';
            product.size = params.size;
            product.gender = params.gender;

            product.save((err, productSaved)=>{
                if(err)
                {
                    return res.status(500).send({message: 'Error al guardar el producto'});
                }
                else if(productSaved)
                {
                    return res.status(200).send({message: 'Producto guardado correctamente', productSaved});
                }
                else
                {
                    return res.status(500).send({message: 'No se guardó el producto'});
                }
            });
        }
        else
        {
            res.status(403).send({message: 'Por favor ingrese todos los datos'});
        }
    }
}

function editProduct(req, res)
{
    let productId = req.params.id;
    let data = req.body;

    if('admin' != req.user.role)
    {
        res.status(403).send({message: 'No tienes permisos para actualizar este producto'});
    }
    else
    {
        Product.findByIdAndUpdate(productId, data, {new: true}, (err, productUpdated)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al actualizar el producto'});
            }
            else if(productUpdated)
            {
                res.status(200).send({message: 'Producto actualizado con exito'})
            }
            else
            {
                res.status(500).send({message: 'No se encontró el producto'});
            }
        });
    }
}

function getProducts(req, res)
{
    var params = req.body;

    if('price' == params.buscar)
    {
        Product.find({}).sort({price: -1}).exec((err, productFind)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al buscar libros',err});
            }
            else if(productFind)
            {
                res.send({message: 'Libros encontrados (precio): ', productFind});
            }
            else
            {
                res.send({message: 'No existe ningun libro.'})
            }
        })
    }
    else if('size' == params.buscar)
    {
        Product.find({}).sort({size: 0}).exec((err, productFind)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al buscar libros',err});
            }
            else if(productFind)
            {
                res.send({message: 'Libros encontrados (size): ', productFind});
            }
            else
            {
                res.send({message: 'No existe ningun libro.'})
            }
        })
    }
    else if('available' == params.buscar)
    {
        Product.find({}).sort({available: -1}).exec((err, productFind)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al buscar libros',err});
            }
            else if(productFind)
            {
                res.send({message: 'Libros encontrados (available): ', productFind});
            }
            else
            {
                res.send({message: 'No existe ningun libro.'})
            }
        })
    }
    else if(params.search)
    {
        Product.find({$or: [{name: params.search}]}).exec((err, productFind)=>{
            if(err)
            {
                res.status(500).send({message: 'Error general al buscar productos', err});
            }
            else if(productFind)
            {
                if(productosFind.length == 0)
                {
                    res.send({message: 'No se encontraron resultados'});
                }
                else
                {
                    res.status(200).send({message: 'Libros encontrados: ',productFind});
                }
            }
            else
            {
                res.send({message: 'No existe ningun producto'});
            }
        })
    }
    else
    {
        Product.find({}).exec((err, products)=>{ /*la respouesta de .find (err, PRODUCTS), es la que lleva la información al frontend */
            if(err)
            {
                res.status(500).send({message: 'Eror al buscar productos'});
            }
            else if(products)
            {
                if(products.length == 0)
                {
                    res.send({message: 'No se encontraron products'});
                }
                else
                {
                    res.status(200).send({message: 'Libros encontrados: ',products});
                }
            }
            else
            {
                res.status(200).send({message: 'No existe ningun producto.'});
            }
        })
    }
}


function deleteProduct(req, res)
{
    let productId = req.params.id;

    if('admin' != req.user.role)
    {
        res.status(403).send({message: 'No tienes permisos para actualizar este producto'});
    }
    else
    {
        Product.findOne({_id: productId}, (err, productFind)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al encontrar el producto',err});
            }
            else if(productFind)
            {
                Product.findByIdAndRemove(productId, (err, productRemoved)=>{
                    if(err)
                    {
                        res.status(500).send({message: 'Error al eliminar el producto',err});
                    }
                    else if(productRemoved)
                    {
                        res.status(200).send({message: 'Producto eliminado!'});
                    }
                    else
                    {
                        res.status(500).send({message: 'No se pudo eliminar el producto'});
                    }
                });
            }
            else
            {
                res.status(404).send({message: 'El producto no existe'});
            }
        });
    }
}

function notAvailable (req, res)
{
    let productId = req.params.id;

    if('admin' != req.user.role)
    {
        res.status(403).send({message: 'No tienes permisos para cambiar el status del producto'});
    }
    else
    {
        Product.findByIdAndUpdate(productId,{available: false}, (err, product)=>{
            if(err)
            {
                res.status(500).send({message: 'Error al buscar el producto y modificarlo'});
            }
            else if(product)
            {
                res.status(200).send({message: 'Ahora es un producto no disponible'});
            }
            else
            {
                res.status(500).send({message: 'No se pudo actualizar el status del producto'});
            }
        })
    }
}

function uploadProductImage(req, res)
{
    let productId = req.params.id;
    //let update = req.body;
    //var fileName;

    if('admin' != req.user.role)
    {
        res.status(403).send({message: 'No tienes permiso de actualizar el producto'});
    }
    else
    {
        if(req.files)
        {
            let filePath = req.files.image.path;
            let fileSplit = String(filePath).split('\\');
            let fileName = fileSplit[1]; /*error*/
            let extension = String(fileName).split('\.');
            let fileExt = extension[1];
            //console.log('filePath',filePath,"fileSplit",fileSplit,'fileName',fileName ,"extensions",extension,"fileExtension",fileExt);
            if(fileExt == 'png' || fileExt == 'jpg'|| fileExt =='jpeg' || fileExt =='gif')
            {
                Product.findByIdAndUpdate(productId, {image: fileName}, {new:true}, (err, productUpdated)=>{
                    if(err)
                    {
                        res.status(500).send({message: err})
                    }
                    else if(productUpdated)
                    {
                        res.status(200).send({product: productUpdated, productImage:productUpdated.image});
                    }
                    else
                    {
                        res.status(400).send({message: 'No se pudo actualizar'});
                    }
                })
            }
            else
            {
                fs.unlink(filePath, (err)=>{
                    if(err)
                    {
                        res.status(500).send({message: 'Extensión no valida y error al eliminar el archivo'});
                    }
                    else
                    {
                        res.status(400).send({message: 'Extesnsion no valida'});
                    }
                })
            }
        }
        else
        {
            res.status(400).send({message: 'No has enviado una imagen para subir'});
        }
    }

}

function getImageProduct(req, res)
{
    let fileName = req.params.fileName;
    let pathFile = './uploads/' + fileName;

    fs.exists(pathFile, (exists)=>{
        if(exists)
        {
            res.sendFile(path.resolve(pathFile));
        }
        else
        {
            res.status(404).send({message: 'La imagen no existe'});
        }
    })
}

module.exports = {
    saveProduct,
    editProduct,
    deleteProduct,
    getProducts,
    notAvailable,
    uploadProductImage,
    getImageProduct   
}