export interface ResponseI {
  status:string;
  action:string;
  show:string;
  message : string | any ;
  delay: any;
  code:string;
  results? :any;
}
