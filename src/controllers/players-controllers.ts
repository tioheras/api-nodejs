import { Request, Response} from "express";
import { createPlayerService, deletePlayerService, getPlayerByIdService, getPlayerService, updatePlayerService } from "../services/players-service";
import { noContent, ok } from "../utils/http-server";
import { StatisticsModel } from "../models/statistics-model";

export const getPlayer = async (req: Request, res: Response) => {
    const httpResponse = await getPlayerService()
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const httpResponse = await getPlayerByIdService(id); //esse id chamou o parseInt acima
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postPlayer = async (req: Request, res: Response) => { // isso aqui ta vindo la do frontend!!! informação do usuario, é um post
    const bodyValue = req.body
    const httpResponse = await createPlayerService(bodyValue);

    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }else {
        const response = await noContent()
        res.status(response.statusCode).json(response.body);
    }
    console.log(bodyValue);
};

export const deletePlayer = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    const httpResponse = await deletePlayerService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updatePlayer = async (req:Request, res:Response) => { // atualizando statisticas dos personagens
    const id = parseInt(req.params.id);
    const bodyValue: StatisticsModel = req.body; // aqui estamos adicionando o corpo de contrato de atualizacação do personagem. frontend vai mandar a info para atualizar apenas statistics
    const httpResponse = await updatePlayerService(id, bodyValue); // passando pro httpresponse o que vem do frontend
    res.status(httpResponse.statusCode).json(httpResponse.body);
};