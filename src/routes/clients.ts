import { Request, Response, Router } from 'express'
import { ClientController } from '../controllers/ClientController'
import { Client } from '../models/Client'

export const clientsRouter = Router()
const clientCtrl = new ClientController()
let idCounter = 1

clientsRouter.post('/', (req: Request, res: Response) => {
    /*const name = req.body.name
    const phone = req.body.phone*/

    /**
     * Associação por desestruturação
     */
    const { name, phone } = req.body
    const client = new Client(idCounter, name, phone)
    if (clientCtrl.save(client)) {
        idCounter++
        /**
         * 201 - Created
         */
        return res.status(201).json({
            message: 'Client created'
        })
    } else {
        /**
         * 409 - Conflict
         */
        return res.status(409).json({
            message: 'A client with this id already exists'
        })
    }

})

clientsRouter.get('/', (req: Request, res: Response) => {
    return res.json({ clients: clientCtrl.findAll() })
})

clientsRouter.delete('/:id', (req: Request,res: Response)=> {
    const id = parseInt(req.params.id)
    res.status(204)
    return res.json({removido: clientCtrl.delete(id)})
})




clientsRouter.put('/', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const {name, phone} = req.body
   
    res.status(202)
    return res.json({ removido: clientCtrl.update})
})