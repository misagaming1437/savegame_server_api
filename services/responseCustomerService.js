import { ResponseCustomer } from "../models/response_customer.js";


const deleteAllResponses = async (req, res, next) => {
    await ResponseCustomer.destroy({
        where: {},
        truncate: true
    });
    return res.status(200).json({ message: "ok" })
}

const deleteResponse = async (req, res, next) => {
    const { id } = req.params
    console.log('id:', id)
    const response = await ResponseCustomer.findOne({ where: { id: id } });
    if (!response) return res.status(200).json({ message: 'not found response' })
    await response.destroy();
    return res.status(200).json({ message: "ok" })
}

const getAllResponses = async (req, res, next) => {
    const responses = await ResponseCustomer.findAll({ order: [['createdAt', 'DESC']] })
    res.status(200).json({ 'responses': responses })
}


const createResponse = async (req, res, next) => {
    const { branch, customer, responseType, message } = req.body;
    const response = await ResponseCustomer.create({ branch: branch, customer: customer, responseType: responseType, message: message });
    return res.status(201).json({ message: "ok", response: response })

}

export default {
    createResponse,
    getAllResponses,
    deleteResponse,
    deleteAllResponses

}