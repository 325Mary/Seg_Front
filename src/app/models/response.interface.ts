export interface ResponseI {
  sessionActive: boolean;
  token: any;
  valid: boolean;
  status:string;
  action:string;
  show:string;
  message : string | any ;
  delay: any;
  code:string;
  results? :any;
}
