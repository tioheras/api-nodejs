import { ClubModel } from "../models/club-model";
import fs from "fs/promises"; // faz parte do pc. para ler o json

const database = [
    {
        id: 1,
        name: "Tio Heras FC"
    }
]

export const findAllClubs = async (): Promise<ClubModel []> => {
    const data = await fs.readFile("./src/data/clubs.json", "utf-8")
    const clubs: ClubModel[] = JSON.parse(data)
    return clubs;
};