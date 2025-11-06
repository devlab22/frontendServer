
//const express = require('express')
import fetch from 'node-fetch'
import express from 'express'
const router = express.Router()
const debug = false

router.get('/', async (req, res) => {

    if (debug) {
        console.log('root api')
    }
    res.json({
        api: 'jsonplaceholder'
    })
})

router.get('/user/', async (req, res) => {

    if (debug) {
        console.log('get user')
    }
    const id = req.query['id'] || ''
    const url = `https://jsonplaceholder.typicode.com/users/${id}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        res.json({
            api: 'get user',
            data: data
        })
    }
    catch (err) {

        res.json({
            api: 'get user',
            message: err.message
        })
    }


})

router.get('/post/', async (req, res) => {

    if (debug) {
        console.log('get post')
    }
    const id = req.query['id'] || ''
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        res.json({
            api: 'get post',
            data: data
        })
    }
    catch (err) {

        res.json({
            api: 'get post',
            message: err.message
        })
    }


})

export default router
