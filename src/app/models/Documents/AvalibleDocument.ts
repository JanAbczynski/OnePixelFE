import { AvalibleDocumentDetails } from "./AvalibleDocumentDetails";

export class AvalibleDocument {

    public Id: string;
    public DocumentName: string;
    public Details: AvalibleDocumentDetails[];
    public DetailsFriendly: string;
    public HaveDetail?: boolean;



    constructor(Id: string = '', DocumentName: string = '', DetailsFriendly: string = '',  Details: AvalibleDocumentDetails[] = []
    ){
        this.Id = Id;
        this.DocumentName = DocumentName;
        this.Details = Details;
        this.DetailsFriendly = DetailsFriendly;
    }
}