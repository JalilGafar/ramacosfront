import {Commande} from './commande'

export class OrderItem {
    id_cmd!: number
    contenu!: string;
    montant!: number;
    date!: string;
    client!: string;
    localisation!: string
}