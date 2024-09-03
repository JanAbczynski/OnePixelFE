import { AvalibleDocument } from "./AvalibleDocument";
import { UserDocumentDetail } from "./UserDocumentDetail";

export class UserDocument {

    public Id?: any;
    public DocumentNumber: string;
    public ExpireDate?: Date;
    public Document?: AvalibleDocument;
    public Details?: UserDocumentDetail[];
    public DetailsFriendly: string;



    constructor(DocumentNumber: string, DetailsFriendly: string
    ){
        this.DocumentNumber = DocumentNumber;
        this.DetailsFriendly = DetailsFriendly;
    }
}