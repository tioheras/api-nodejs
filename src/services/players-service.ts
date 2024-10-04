//geralmente grande parte das tratativas de decisão sao feitas aqui.. if, else, verificação... 
//não cabe ao service informar a dataa (response), ele precisa buscar no database. aqui é um caminho. 
// puxar de repositories
// service faz regras de negocio

import { response } from "express";
import { PlayerModel } from "../models/player-model";
import { deleteOnePlayer, findAllPlayers, findAndModifyPlayer, findPlayersById, inserPlayer } from "../repositories/players-repository";
import { badRequest, created, noContent, ok } from "../utils/http-server";
import { StatisticsModel } from "../models/statistics-model";

export const getPlayerService = async () => {
    const data = await findAllPlayers();
    let response = null;
    if (data){
        response = await ok(data);
    } else {
        response = await noContent();
    }
    return response;
};

export const getPlayerByIdService = async (id: number) => {
    //pedir pro repositório de dados
    const data = await findPlayersById(id);
    let response = null;

    if (data) { // se data tiver numero, entao ele guarda em response. se não mostra sem conteudo
        response = ok(data); //HttpResponse.ok(data)
    } else {
        response = noContent(); //HttpResponse.noContent()
    }
    return response
};

export const createPlayerService = async (player: PlayerModel) => { // isso aqui é a criação do player, post do player pelo frontend sendo criado no back
    //verifica se está vazio
    let response = null;
    if(Object.keys(player).length !== 0) {
        await inserPlayer(player);
        response = created();
    } else {
        response = badRequest();
    }
    return response;
};

export const deletePlayerService = async(id: number) => {
    let response = null;
    const isDeleted = await deleteOnePlayer(id);
        if(isDeleted){
            response = await ok({message: "deleted"});
        } else {
            response = await badRequest();
        }
    return response
};

export const updatePlayerService = async (id: number, statistics: StatisticsModel) => {
    const data = await findAndModifyPlayer(id, statistics);
    let response = null;

    if(Object.keys(data).length === 0){
        response = await badRequest();
    } else {
        response = await ok(data);
    }

    return response;
}