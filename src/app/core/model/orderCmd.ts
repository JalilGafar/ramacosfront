import {Commande} from './commande'

export class OrderCmd {
    id_cmd!: number
    contenu!: Commande[];
    montant!: number;
    date!: string;
    client!: string;
    localisation!: string
}