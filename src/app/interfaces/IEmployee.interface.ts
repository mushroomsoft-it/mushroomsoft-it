export interface IEmployeeEsEn {
  en: IEmployee;
  es: IEmployee;
}

export interface IEmployee {
  title:string;
  subtitle:string;
  description:string;
  image:string;
  showDescription:boolean;
  animate:boolean;
  actionText:string;
}
