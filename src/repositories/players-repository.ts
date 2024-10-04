import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";


const database: PlayerModel[] = [
    {
        id: 1,
        name: "Lionel Messi",
        club: "Paris Saint-German",
        nationality: "Argentina",
        position: "Forward",
        statistics: {
            Overall: 93,
            Pace: 85,
            Shooting: 94,
            Passing: 91,
            Dribbling: 95,
            Defending: 38,
            Physical: 65,
        },
    },
    {
        id: 2,
        name: "Ronaldo Fenomeno",
        club: "Brasil",
        nationality: "Brasileiro",
        position: "Forward",
        statistics: {
            Overall: 99,
            Pace: 95,
            Shooting: 92,
            Passing: 98,
            Dribbling: 96,
            Defending: 55,
            Physical: 85,
        },
    },
    {
        id: 3,
        name: "Ronaldinho Bruxo",
        club: "Brasil",
        nationality: "Brasileiro",
        position: "Forward",
        statistics: {
            Overall: 99,
            Pace: 98,
            Shooting: 90,
            Passing: 97,
            Dribbling: 94,
            Defending: 80,
            Physical: 85,
        },
    },
];

export const findAllPlayers = async (): Promise<PlayerModel []> => {
    return database;
};

export const findPlayersById = async (id: number): Promise<PlayerModel | undefined> => {
    return database.find((player) => player.id === id);
};

export const inserPlayer = async (player: PlayerModel) => {
    database.push(player);
};

export const deleteOnePlayer = async (id: number) => {
    //verificar em qual posição (indice) que o jogador está
    const index = database.findIndex( p => p.id === id);
    if(index !== -1){
        database.splice(index, 1);
        return true;
    }
    return false;
} ;

export const findAndModifyPlayer = async (id: number, statistics: StatisticsModel) => { // encontrar player no database e modificar com as alterações do frontend
    const playerIndex = database.findIndex ( player => player.id === id) //aqui é pra buscar o player. p de player. player no db vai receber p.id do frontend e vai buscar === id no db
    
    if (playerIndex !== -1){
        database[playerIndex].statistics = statistics; //guardando as estatisticas recebidas do front end e armazenando no statistics do database
    }
    return database[playerIndex]
};